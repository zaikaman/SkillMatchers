export const SKILL_CATEGORIES = {
  'Programming Languages': [
    'JavaScript',
    'TypeScript',
    'Python',
    'Java',
    'C++',
    'C#',
    'Ruby',
    'PHP',
    'Swift',
    'Kotlin',
    'Go',
    'Rust'
  ],
  'Frontend Development': [
    'React',
    'Vue.js',
    'Angular',
    'Next.js',
    'Nuxt.js',
    'HTML',
    'CSS',
    'Sass/SCSS',
    'Tailwind CSS',
    'Material UI',
    'Bootstrap',
    'Redux',
    'GraphQL',
    'WebGL',
    'Three.js'
  ],
  'Backend Development': [
    'Node.js',
    'Express.js',
    'Django',
    'Flask',
    'Spring Boot',
    'Laravel',
    'Ruby on Rails',
    'ASP.NET',
    'FastAPI',
    'NestJS',
    'Microservices',
    'REST API',
    'WebSocket',
    'gRPC'
  ],
  'Database': [
    'MySQL',
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'SQLite',
    'Oracle',
    'SQL Server',
    'Firebase',
    'Supabase',
    'DynamoDB',
    'Cassandra',
    'Neo4j',
    'Elasticsearch'
  ],
  'DevOps & Cloud': [
    'Docker',
    'Kubernetes',
    'AWS',
    'Azure',
    'Google Cloud',
    'CI/CD',
    'Jenkins',
    'Git',
    'Linux',
    'Nginx',
    'Terraform',
    'Ansible',
    'Prometheus',
    'Grafana'
  ],
  'Mobile Development': [
    'React Native',
    'Flutter',
    'iOS Development',
    'Android Development',
    'Xamarin',
    'Ionic',
    'SwiftUI',
    'Kotlin Multiplatform',
    'Mobile UI/UX',
    'App Store Optimization'
  ],
  'AI & Machine Learning': [
    'TensorFlow',
    'PyTorch',
    'Scikit-learn',
    'Computer Vision',
    'NLP',
    'Deep Learning',
    'Machine Learning',
    'Data Mining',
    'Neural Networks',
    'Reinforcement Learning',
    'OpenAI API',
    'LangChain'
  ],
  'Data Science & Analytics': [
    'Python',
    'R',
    'SQL',
    'Data Analysis',
    'Data Visualization',
    'Statistical Analysis',
    'Power BI',
    'Tableau',
    'Excel',
    'Big Data',
    'Data Modeling',
    'A/B Testing',
    'Data Pipeline'
  ],
  'Design & Creative': [
    'UI Design',
    'UX Design',
    'Graphic Design',
    'Adobe Creative Suite',
    'Figma',
    'Sketch',
    'Motion Design',
    'Video Editing',
    'Photography',
    'Illustration',
    '3D Modeling',
    'Animation'
  ],
  'Digital Marketing': [
    'SEO',
    'SEM',
    'Social Media Marketing',
    'Content Marketing',
    'Email Marketing',
    'Google Analytics',
    'Google Ads',
    'Facebook Ads',
    'Marketing Analytics',
    'Marketing Automation',
    'CRM',
    'Copywriting'
  ],
  'Project Management': [
    'Agile',
    'Scrum',
    'Kanban',
    'JIRA',
    'Trello',
    'Project Planning',
    'Risk Management',
    'Budgeting',
    'Team Leadership',
    'Stakeholder Management',
    'Quality Assurance',
    'Resource Management'
  ],
  'Business & Finance': [
    'Financial Analysis',
    'Business Strategy',
    'Market Research',
    'Business Development',
    'Sales',
    'Accounting',
    'Investment',
    'Risk Analysis',
    'Business Intelligence',
    'Entrepreneurship',
    'Negotiation',
    'Business Planning'
  ],
  'Soft Skills': [
    'Communication',
    'Teamwork',
    'Problem Solving',
    'Time Management',
    'Leadership',
    'Critical Thinking',
    'Adaptability',
    'Creativity',
    'Emotional Intelligence',
    'Conflict Resolution',
    'Decision Making',
    'Public Speaking'
  ],
  'Languages': [
    'English',
    'Vietnamese',
    'Japanese',
    'Chinese',
    'Korean',
    'French',
    'German',
    'Spanish',
    'Russian',
    'Hindi'
  ]
} as const

export const ALL_SKILLS = Object.values(SKILL_CATEGORIES).flat()

export type Skill = typeof ALL_SKILLS[number] 