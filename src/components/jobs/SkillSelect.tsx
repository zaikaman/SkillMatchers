'use client'

import { useState } from 'react'
import { SKILL_CATEGORIES, type Skill } from '@/lib/constants'

interface SkillSelectProps {
  selectedSkills: Skill[]
  onChange: (skills: Skill[]) => void
  placeholder?: string
  className?: string
}

export default function SkillSelect({
  selectedSkills,
  onChange,
  placeholder = 'Select skills...',
  className = ''
}: SkillSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const handleRemoveSkill = (skillToRemove: Skill) => {
    onChange(selectedSkills.filter(skill => skill !== skillToRemove))
  }

  const handleAddSkill = (skillToAdd: Skill) => {
    if (!selectedSkills.includes(skillToAdd)) {
      onChange([...selectedSkills, skillToAdd])
    }
    setSearchTerm('')
    setIsOpen(false)
  }

  const filteredSkills = Object.entries(SKILL_CATEGORIES)
    .filter(([category, skills]) => {
      const hasMatchingSkills = skills.some(skill =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      )
      return hasMatchingSkills
    })

  return (
    <div className={`relative ${className}`}>
      {/* Input and Selected Skills */}
      <div
        className="min-h-[38px] w-full rounded-md border border-gray-300 px-3 py-1 focus-within:border-pink-500 focus-within:ring-1 focus-within:ring-pink-500"
        onClick={() => setIsOpen(true)}
      >
        <div className="flex flex-wrap gap-1">
          {selectedSkills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1 rounded-full bg-pink-100 px-2 py-1 text-sm text-pink-800"
            >
              {skill}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemoveSkill(skill)
                }}
                className="text-pink-600 hover:text-pink-800"
              >
                ×
              </button>
            </span>
          ))}
          <input
            type="text"
            className="flex-1 border-none p-1 focus:outline-none focus:ring-0"
            placeholder={selectedSkills.length === 0 ? placeholder : ''}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
          />
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
          {filteredSkills.length === 0 ? (
            <div className="px-4 py-2 text-sm text-gray-500">No skills found</div>
          ) : (
            filteredSkills.map(([category, skills]) => (
              <div key={category}>
                <div className="bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-500">
                  {category}
                </div>
                {skills
                  .filter(skill =>
                    skill.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map(skill => (
                    <button
                      key={skill}
                      type="button"
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                        selectedSkills.includes(skill)
                          ? 'bg-pink-50 text-pink-900'
                          : 'text-gray-900'
                      }`}
                      onClick={() => handleAddSkill(skill)}
                    >
                      {skill}
                    </button>
                  ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
} 