'use client'

import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { 
  getProfile, 
  getConversations, 
  getMessages, 
  sendMessage, 
  getMatchedWorkers,
  getMatchedJobs,
  getOrCreateConversation
} from '@/lib/actions'
import { supabase } from '@/lib/supabase'
import Loading from '@/components/Loading'
import toast from 'react-hot-toast'
import type { Message, Conversation, MatchedWorker, MatchedJob } from '@/lib/actions'

export default function MessagesPage() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<any>(null)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [matches, setMatches] = useState<(MatchedWorker | MatchedJob)[]>([])
  const [showNewChat, setShowNewChat] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current
      chatContainerRef.current.scrollTop = scrollHeight - clientHeight
    }
  }

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    async function loadData() {
      try {
        const [profileData, conversationsData] = await Promise.all([
          getProfile(),
          getConversations()
        ])
        setProfile(profileData)
        setConversations(conversationsData)

        // Check for conversation ID in URL
        const conversationId = searchParams.get('conversation')
        if (conversationId) {
          const conversation = conversationsData.find(c => c.id === conversationId)
          if (conversation) {
            setSelectedConversation(conversation)
          }
        }

        // Load matches based on user role
        const matchesData = await (profileData.role === 'employer' 
          ? getMatchedWorkers() 
          : getMatchedJobs()
        )
        setMatches(matchesData)

        // Subscribe to new messages
        const messagesSubscription = supabase
          .channel('messages')
          .on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: `receiver_id=eq.${profileData.id}`
          }, async (payload) => {
            const newMessage = payload.new as Message
            
            // Update messages if in current conversation
            if (selectedConversation?.id === newMessage.conversation_id) {
              setMessages(prev => {
                if (prev.some(msg => msg.id === newMessage.id)) {
                  return prev
                }
                return [...prev, newMessage]
              })
            }

            // Update conversation list
            setConversations(prev => {
              const updatedConvs = [...prev]
              const convIndex = updatedConvs.findIndex(c => c.id === newMessage.conversation_id)
              if (convIndex > -1) {
                // Kiểm tra xem tin nhắn cuối cùng có phải là tin nhắn mới không
                if (updatedConvs[convIndex].last_message?.id === newMessage.id) {
                  return updatedConvs
                }
                updatedConvs[convIndex] = {
                  ...updatedConvs[convIndex],
                  last_message: newMessage,
                  unread_count: updatedConvs[convIndex].unread_count + 1
                }
                // Move conversation to top
                const [conv] = updatedConvs.splice(convIndex, 1)
                updatedConvs.unshift(conv)
              }
              return updatedConvs
            })
          })
          .subscribe()

        // Subscribe to conversation updates
        const conversationsSubscription = supabase
          .channel('conversations')
          .on('postgres_changes', {
            event: 'UPDATE',
            schema: 'public',
            table: 'conversations',
            filter: `user_1_id=eq.${profileData.id}`,
          }, handleConversationUpdate)
          .on('postgres_changes', {
            event: 'UPDATE',
            schema: 'public',
            table: 'conversations',
            filter: `user_2_id=eq.${profileData.id}`,
          }, handleConversationUpdate)
          .subscribe()

        return () => {
          messagesSubscription.unsubscribe()
          conversationsSubscription.unsubscribe()
        }
      } catch (error) {
        console.error('[MessagesPage] Error loading data:', error)
        toast.error('Could not load messages')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [searchParams])

  const handleConversationUpdate = async (payload: any) => {
    const updatedConv = payload.new
    // Reload conversations to get latest data
    const conversationsData = await getConversations()
    setConversations(conversationsData)
  }

  useEffect(() => {
    let messageSubscription: any = null

    if (selectedConversation) {
      loadMessages(selectedConversation.id)

      // Subscribe to messages for selected conversation
      messageSubscription = supabase
        .channel(`messages:${selectedConversation.id}`)
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${selectedConversation.id}`
        }, (payload) => {
          const newMessage = payload.new as Message
          // Chỉ xử lý tin nhắn từ người khác gửi
          if (newMessage.sender_id !== profile?.id) {
            setMessages(prev => {
              if (prev.some(msg => msg.id === newMessage.id)) {
                return prev
              }
              return [...prev, newMessage]
            })
          }
        })
        .subscribe()
    }

    return () => {
      if (messageSubscription) {
        messageSubscription.unsubscribe()
      }
    }
  }, [selectedConversation, profile?.id])

  const loadMessages = async (conversationId: string) => {
    try {
      const messagesData = await getMessages(conversationId)
      setMessages(messagesData)
    } catch (error) {
      console.error('[MessagesPage] Error loading messages:', {
        conversationId,
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
          cause: error.cause
        } : error
      })
      toast.error(error instanceof Error ? error.message : 'Could not load messages')
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedConversation || !newMessage.trim() || sending) return

    try {
      setSending(true)
      const message = await sendMessage(
        selectedConversation.id,
        selectedConversation.user.id,
        newMessage.trim()
      )
      setMessages([...messages, message])
      setNewMessage('')
      
      // Update last message in conversations list
      setConversations(conversations.map(conv => 
        conv.id === selectedConversation.id
          ? {
              ...conv,
              last_message: message
            }
          : conv
      ))
    } catch (error) {
      console.error('[MessagesPage] Error sending message:', {
        conversationId: selectedConversation.id,
        receiverId: selectedConversation.user.id,
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
          cause: error.cause
        } : error
      })
      toast.error(error instanceof Error ? error.message : 'Could not send message')
    } finally {
      setSending(false)
    }
  }

  const startNewConversation = async (userId: string, name: string) => {
    try {
      const conversationId = await getOrCreateConversation(userId)
      
      // Check if conversation already exists in the list
      const existingConv = conversations.find(c => c.id === conversationId)
      if (existingConv) {
        setSelectedConversation(existingConv)
        setShowNewChat(false)
        return
      }

      // Add new conversation to the list
      const newConversation: Conversation = {
        id: conversationId,
        user: {
          id: userId,
          full_name: name,
          avatar_url: '',
          last_seen: new Date().toISOString()
        },
        unread_count: 0
      }
      setConversations([newConversation, ...conversations])
      setSelectedConversation(newConversation)
      setShowNewChat(false)
    } catch (error) {
      console.error('[MessagesPage] Error starting conversation:', {
        userId,
        name,
        error: error instanceof Error ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
          cause: error.cause
        } : error
      })
      toast.error(error instanceof Error ? error.message : 'Could not start conversation')
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-12 min-h-[600px]">
            {/* Conversations List */}
            <div className="col-span-4 border-r border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Messages</h2>
                  <button
                    onClick={() => setShowNewChat(!showNewChat)}
                    className="px-3 py-1 bg-pink-500 text-white rounded-full hover:bg-pink-600 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    {showNewChat ? 'Back' : 'New Chat'}
                  </button>
                </div>
              </div>
              <div className="overflow-y-auto h-[calc(600px-4rem)]">
                {showNewChat ? (
                  // Show matches list
                  <div>
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-medium text-gray-500">Start a new conversation</h3>
                    </div>
                    {matches.map((match) => {
                      const isEmployer = 'employer' in match
                      const userId = isEmployer ? match.employer.id : match.id
                      const name = isEmployer ? match.employer.name : match.name
                      const avatar = isEmployer ? match.employer.avatar_url : match.avatar_url
                      const subtitle = isEmployer ? match.title : match.job.title

                      return (
                        <div
                          key={userId}
                          className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                          onClick={() => startNewConversation(userId, name)}
                        >
                          <div className="flex items-center space-x-3">
                            <Image
                              src={avatar || '/default-avatar.png'}
                              alt={name}
                              width={48}
                              height={48}
                              className="rounded-full"
                            />
                            <div>
                              <h3 className="font-medium">{name}</h3>
                              <p className="text-sm text-gray-500">{subtitle}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  // Show conversations list
                  conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedConversation?.id === conversation.id ? 'bg-gray-50' : ''
                      }`}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Image
                            src={conversation.user.avatar_url || '/default-avatar.png'}
                            alt={conversation.user.full_name}
                            width={48}
                            height={48}
                            className="rounded-full"
                          />
                          {conversation.unread_count > 0 && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">{conversation.unread_count}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{conversation.user.full_name}</h3>
                          {conversation.last_message && (
                            <p className="text-sm text-gray-500 truncate">
                              {conversation.last_message.content}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className="col-span-8">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={selectedConversation.user.avatar_url || '/default-avatar.png'}
                        alt={selectedConversation.user.full_name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="font-medium">{selectedConversation.user.full_name}</h3>
                        <p className="text-sm text-gray-500">
                          Last seen {new Date(selectedConversation.user.last_seen).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div ref={chatContainerRef} className="p-4 h-[calc(600px-8rem)] overflow-y-auto">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.sender_id === profile.id ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg px-4 py-2 ${
                              message.sender_id === profile.id
                                ? 'bg-pink-500 text-white'
                                : 'bg-gray-100'
                            }`}
                          >
                            <p>{message.content}</p>
                            <p className="text-xs mt-1 opacity-70">
                              {new Date(message.created_at).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <form onSubmit={handleSendMessage} className="flex space-x-4">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-pink-500"
                      />
                      <button
                        type="submit"
                        disabled={sending || !newMessage.trim()}
                        className="bg-pink-500 text-white rounded-full px-6 py-2 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Send
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Select a conversation or start a new one
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 