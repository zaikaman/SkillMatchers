# SkillMatch 🚀

### The Tinder for Professional Talent Matching

**SkillMatch** is a modern, AI-powered platform that revolutionizes how employers find talented workers and how professionals discover their dream jobs. Using an intuitive swipe-based interface inspired by modern dating apps, SkillMatch makes professional networking engaging, efficient, and fun.

---

## 🌟 **Live Demo**

🔗 **[Experience SkillMatch Live](https://skillmatch-demo.vercel.app)**

---

## 📱 **Key Features**

### 🎯 **Smart Matching System**
- **AI-Powered Recommendations**: Intelligent matching algorithm using skill compatibility, experience level, and preferences
- **Dual Perspectives**: Separate interfaces for employers and job seekers with tailored experiences
- **Real-time Matching**: Instant notifications when both parties express mutual interest

### 💼 **For Employers**
- **Job Posting Management**: Create, edit, and manage job opportunities
- **Candidate Discovery**: Swipe through qualified candidates with skill matching
- **Comprehensive Profiles**: View detailed candidate profiles with skills, experience, and portfolios
- **Direct Communication**: Built-in messaging system for seamless recruitment conversations

### 👨‍💻 **For Job Seekers**
- **Profile Showcase**: Professional profiles with skills, experience, and portfolio integration
- **Job Discovery**: Swipe through curated job opportunities matching your skills
- **Skill-based Matching**: Get matched with jobs that align with your expertise
- **Career Growth**: Connect with opportunities for skill development and career advancement

### 💬 **Real-time Communication**
- **Instant Messaging**: Real-time chat system for matched users
- **Message History**: Persistent conversation management
- **Match Notifications**: Immediate alerts for new matches and messages
- **Professional Networking**: Build lasting professional relationships

### 🔧 **Advanced Technical Features**
- **Database Health Monitoring**: Automatic database ping system to ensure 99.9% uptime
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Authentication System**: Secure login with Google OAuth integration
- **Real-time Updates**: Live notifications and real-time data synchronization

---

## 🛠 **Technology Stack**

### **Frontend**
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Modern, responsive styling
- **Framer Motion** - Smooth animations and transitions
- **Radix UI** - Accessible component primitives

### **Backend & Database**
- **Supabase** - Backend-as-a-Service with PostgreSQL
- **Row Level Security (RLS)** - Advanced data security
- **Real-time Subscriptions** - Live data updates
- **RESTful APIs** - Efficient data handling

### **Authentication & Security**
- **Supabase Auth** - Secure user authentication
- **Google OAuth** - Social login integration
- **JWT Tokens** - Secure session management
- **Input Validation** - Data integrity and security

### **Real-time Features**
- **WebSocket Connections** - Real-time messaging
- **Database Triggers** - Automatic updates
- **Event Subscriptions** - Live notifications

### **Development & Deployment**
- **ESLint** - Code quality and consistency
- **Git** - Version control
- **Vercel** - Optimized deployment platform
- **Environment Management** - Secure configuration handling

---

## 🚀 **Getting Started**

### **Prerequisites**
```bash
Node.js 18+ 
npm or yarn
Git
```

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/zaikaman/SkillMatchers.git
cd SkillMatchers
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env.local
```

4. **Configure Environment Variables**
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Database
POSTGRES_URL=your_postgres_connection_string

# Authentication
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Optional: Agora for video calls
NEXT_PUBLIC_AGORA_APP_ID=your_agora_app_id
```

5. **Database Setup**
```bash
# Run database migrations
npm run db:migrate

# Seed initial data (optional)
npm run db:seed
```

6. **Start Development Server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see SkillMatch in action! 🎉

---

## 📊 **Project Architecture**

### **Database Schema**
- **profiles** - User profile information (workers & employers)
- **jobs** - Job postings and requirements
- **matches** - Matching relationships between users and jobs
- **conversations** - Chat conversations between matched users
- **messages** - Individual messages within conversations

### **API Structure**
```
/api/
├── auth/           # Authentication endpoints
├── ping-db/        # Database health monitoring
├── cron/           # Scheduled tasks
└── upload/         # File upload handling
```

### **Key Components**
- **Dashboard** - Main user interface for both user types
- **Match System** - Swipe-based matching interface
- **Messaging** - Real-time chat functionality
- **Profile Management** - User profile creation and editing
- **Job Management** - Job posting and management (employers)

---

## 🎨 **Screenshots**

### Landing Page
Modern, gradient-rich homepage with clear value proposition and call-to-action.

### Dashboard
Personalized dashboard showing match statistics, new messages, and quick actions.

### Matching Interface
Tinder-like swipe interface for discovering candidates or job opportunities.

### Real-time Messaging
Professional chat interface with real-time message delivery and conversation management.

---

## 🔄 **Database Health Monitoring**

SkillMatch includes an advanced database health monitoring system:

- **Automatic Ping System**: Database connectivity is checked every minute
- **Real-time Status Display**: Visual indicator showing database connection status
- **Error Recovery**: Automatic retry mechanism with intelligent backoff
- **Admin Dashboard**: Detailed monitoring interface for system administrators
- **Cron Job Support**: External monitoring via cron services for 24/7 uptime

---

## 🌟 **Unique Features**

### **Skill Matching Algorithm**
- Intelligent compatibility scoring based on required vs. available skills
- Experience level matching for optimal fit
- Geographic and remote work preferences
- Salary expectation alignment

### **User Experience Design**
- Mobile-first responsive design
- Intuitive swipe gestures
- Smooth animations and transitions
- Accessibility-compliant interface

### **Professional Focus**
- Industry-specific skill categories
- Professional portfolio integration
- LinkedIn profile linking
- CV/Resume upload and display

---

## 🚀 **Future Enhancements**

### **AI Integration** (Planned)
- **Google Gemini AI** for advanced profile analysis
- **CV Parsing** using AI for automatic skill extraction
- **Intelligent Recommendations** based on user behavior
- **Interview Scheduling** with AI-powered suggestions

### **Advanced Features** (Roadmap)
- **Video Calling** integration for remote interviews
- **Skill Assessment Tests** for verification
- **Company Culture Matching** for better fit
- **Analytics Dashboard** for recruitment insights

---

## 📈 **Performance & Scalability**

- **Database Connection Pooling** for optimal performance
- **Efficient Query Optimization** using Supabase best practices
- **Real-time Subscriptions** without performance overhead
- **Responsive Image Optimization** using Next.js Image component
- **Edge Runtime** deployment for global performance

---

## 🔒 **Security Features**

- **Row Level Security (RLS)** for data isolation
- **Input Sanitization** preventing injection attacks
- **Secure Authentication** with JWT and OAuth
- **Environment Variable Protection** for sensitive data
- **HTTPS Enforcement** for secure communication

---

## 📚 **Documentation**

### **Additional Resources**
- [`DATABASE_PING_SETUP.md`](./DATABASE_PING_SETUP.md) - Database monitoring setup guide
- [`MIGRATION_GUIDE.md`](./HUONG-DAN-MIGRATION.md) - Database migration instructions
- [`SETUP_GUIDE.md`](./setup-new-project.md) - Complete project setup guide

### **API Documentation**
Comprehensive API documentation available in the `/docs` folder (coming soon).

---

## 👨‍💻 **Developer**

**Đinh Phúc Thịnh**  
*Full-Stack Developer & Software Engineer*

- 🌐 **GitHub**: [@zaikaman](https://github.com/zaikaman)
- 💼 **LinkedIn**: [Đinh Phúc Thịnh](https://www.linkedin.com/in/%C4%91inh-ph%C3%BAc-th%E1%BB%8Bnh-2561b5274)
- 📧 **Email**: [zaikaman123@gmail.com](mailto:zaikaman123@gmail.com)

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 **Contributing**

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/zaikaman/SkillMatchers/issues).

### **Development Workflow**
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## ⭐ **Show Your Support**

Give a ⭐️ if this project helped you or if you find it interesting!

---

## 🎯 **Project Status**

🟢 **Active Development** - Currently in active development with regular updates and new features being added.

**Latest Update**: Advanced database monitoring system with real-time health checks and automatic recovery mechanisms.

---

*Built with ❤️ by [Đinh Phúc Thịnh](https://github.com/zaikaman) using modern web technologies*
