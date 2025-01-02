# SkillMatchers

SkillMatch is a modern web platform that connects employers with skilled workers, inspired by the social matching concept of Tinder but specifically designed for the professional employment market.

Database: 
--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: match_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.match_status AS ENUM (
    'pending',
    'accepted',
    'rejected'
);


ALTER TYPE public.match_status OWNER TO postgres;

--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;


ALTER FUNCTION public.handle_new_user() OWNER TO postgres;

--
-- Name: moddatetime(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.moddatetime() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$;


ALTER FUNCTION public.moddatetime() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: jobs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jobs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    employer_id uuid,
    title text NOT NULL,
    description text,
    requirements jsonb,
    salary_range jsonb,
    location text,
    work_type text,
    status text DEFAULT 'draft'::text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT jobs_status_check CHECK ((status = ANY (ARRAY['draft'::text, 'published'::text, 'closed'::text]))),
    CONSTRAINT jobs_work_type_check CHECK ((work_type = ANY (ARRAY['remote'::text, 'hybrid'::text, 'onsite'::text])))
);


ALTER TABLE public.jobs OWNER TO postgres;

--
-- Name: matches; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.matches (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    job_id uuid NOT NULL,
    worker_id uuid NOT NULL,
    employer_id uuid NOT NULL,
    employer_status public.match_status DEFAULT 'pending'::public.match_status NOT NULL,
    worker_status public.match_status DEFAULT 'pending'::public.match_status NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE public.matches OWNER TO postgres;

--
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profiles (
    id uuid NOT NULL,
    role text,
    full_name text,
    avatar_url text,
    bio text,
    experience text,
    availability text,
    languages text[],
    skills text[],
    has_completed_onboarding boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    cv_url text,
    linkedin_url text,
    cv_download_url text,
    CONSTRAINT profiles_role_check CHECK ((role = ANY (ARRAY['worker'::text, 'employer'::text])))
);


ALTER TABLE public.profiles OWNER TO postgres;

--
-- Data for Name: jobs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jobs (id, employer_id, title, description, requirements, salary_range, location, work_type, status, created_at, updated_at) FROM stdin;
bae1896b-8653-4df9-8f6e-225941dd0f92	2970b4c8-9e6e-404b-a297-6dbda72af645	Senior	asdasd	{"required": ["JavaScript"], "preferred": ["JavaScript"]}	{"max": 80000, "min": 50000}	Ho Chi Minh	remote	published	2025-01-02 10:56:10.542815+00	2025-01-02 12:18:07.154518+00
\.


--
-- Data for Name: matches; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.matches (id, job_id, worker_id, employer_id, employer_status, worker_status, created_at, updated_at) FROM stdin;
a4c87964-0608-4ff2-ae3a-52b47437574e	bae1896b-8653-4df9-8f6e-225941dd0f92	be40f74a-6af5-43a0-b2c5-fe48182dec06	2970b4c8-9e6e-404b-a297-6dbda72af645	accepted	accepted	2025-01-02 13:55:46.594854+00	2025-01-02 14:07:23.00476+00
\.


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profiles (id, role, full_name, avatar_url, bio, experience, availability, languages, skills, has_completed_onboarding, created_at, updated_at, cv_url, linkedin_url, cv_download_url) FROM stdin;
2970b4c8-9e6e-404b-a297-6dbda72af645	employer	Kien Vocal	https://pjkcmfosyckukzofylrk.supabase.co/storage/v1/object/public/avatars/4z38t7550lo_1735825105269.png	asdasd	11-50	immediately	{Vietnamese,English}	{JavaScript,Python}	t	2025-01-02 10:41:54.095846+00	2025-01-02 13:38:25.735+00	\N	\N	\N
be40f74a-6af5-43a0-b2c5-fe48182dec06	worker	Thinh Dinh	https://pjkcmfosyckukzofylrk.supabase.co/storage/v1/object/public/avatars/gsh0uifmks7_1735812847738.png	asd	3-5	immediately	{Vietnamese,English}	{JavaScript,PHP,React,C++}	t	2025-01-02 10:12:35.51957+00	2025-01-02 13:46:04.245+00	https://pjkcmfosyckukzofylrk.supabase.co/storage/v1/object/public/cvs/jey01qdv3df_1735812805635.pdf	https://www.linkedin.com/authwall?trk=bf&trkInfo=AQH3CcxTZSDBVwAAAZQnQ-6Yx1Xfb37rb9na-hSPTgfM-3SI9hMXW7gH2XPTX9j5oQ50E1CYJkxxePMIzGj5wrSyBsa-9QZ_PHn-NwIuBgZJdz0SEcqjqBh5o2IAjQg1ZNq8Hzk=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fjohndoe	\N
\.


--
-- Name: jobs jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_pkey PRIMARY KEY (id);


--
-- Name: matches matches_job_id_worker_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT matches_job_id_worker_id_key UNIQUE (job_id, worker_id);


--
-- Name: matches matches_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT matches_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: jobs handle_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.jobs FOR EACH ROW EXECUTE FUNCTION public.moddatetime();


--
-- Name: matches handle_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER handle_updated_at BEFORE UPDATE ON public.matches FOR EACH ROW EXECUTE FUNCTION public.moddatetime();


--
-- Name: jobs jobs_employer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.jobs
    ADD CONSTRAINT jobs_employer_id_fkey FOREIGN KEY (employer_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: matches matches_employer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT matches_employer_id_fkey FOREIGN KEY (employer_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: matches matches_job_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT matches_job_id_fkey FOREIGN KEY (job_id) REFERENCES public.jobs(id) ON DELETE CASCADE;


--
-- Name: matches matches_worker_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matches
    ADD CONSTRAINT matches_worker_id_fkey FOREIGN KEY (worker_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: profiles profiles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: matches Allow authenticated users to insert into matches; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow authenticated users to insert into matches" ON public.matches FOR INSERT TO authenticated WITH CHECK (true);


--
-- Name: matches Allow public users to update matches; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Allow public users to update matches" ON public.matches FOR UPDATE USING (true) WITH CHECK (true);


--
-- Name: jobs Employers can delete their own jobs; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Employers can delete their own jobs" ON public.jobs FOR DELETE USING ((auth.uid() = employer_id));


--
-- Name: jobs Employers can insert their own jobs; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Employers can insert their own jobs" ON public.jobs FOR INSERT WITH CHECK ((auth.uid() = employer_id));


--
-- Name: matches Employers can see their job matches; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Employers can see their job matches" ON public.matches FOR SELECT USING ((employer_id = auth.uid()));


--
-- Name: jobs Employers can update their own jobs; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Employers can update their own jobs" ON public.jobs FOR UPDATE USING ((auth.uid() = employer_id));


--
-- Name: jobs Public jobs are viewable by everyone; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public jobs are viewable by everyone" ON public.jobs FOR SELECT USING (true);


--
-- Name: profiles Public profiles are viewable by everyone; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);


--
-- Name: profiles Users can insert their own profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK ((( SELECT auth.uid() AS uid) = id));


--
-- Name: profiles Users can update their own profile; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING ((( SELECT auth.uid() AS uid) = id));


--
-- Name: matches Workers can see their own matches; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Workers can see their own matches" ON public.matches FOR SELECT USING ((worker_id = auth.uid()));


--
-- Name: jobs; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

--
-- Name: matches; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- Name: FUNCTION handle_new_user(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.handle_new_user() TO anon;
GRANT ALL ON FUNCTION public.handle_new_user() TO authenticated;
GRANT ALL ON FUNCTION public.handle_new_user() TO service_role;


--
-- Name: FUNCTION moddatetime(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.moddatetime() TO anon;
GRANT ALL ON FUNCTION public.moddatetime() TO authenticated;
GRANT ALL ON FUNCTION public.moddatetime() TO service_role;


--
-- Name: TABLE jobs; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.jobs TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.jobs TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.jobs TO service_role;


--
-- Name: TABLE matches; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.matches TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.matches TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.matches TO service_role;


--
-- Name: TABLE profiles; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.profiles TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.profiles TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.profiles TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO service_role;


--
-- PostgreSQL database dump complete
--

## 🌟 Overview

SkillMatch revolutionizes the way employers and workers connect in the digital age. Our platform provides an intuitive, efficient, and engaging way to match the right talent with the right opportunities.

## ✨ Key Features

- **Smart Matching Algorithm**: Connects employers with workers based on skills, experience, and preferences
- **Real-time Chat**: Instant communication between employers and potential candidates
- **Profile Customization**: Detailed profiles for both employers and workers
- **Skill Verification**: Built-in system to verify worker skills and credentials
- **Job Posting**: Easy-to-use interface for employers to post job opportunities
- **Search & Filter**: Advanced search functionality with multiple filtering options
- **Mobile Responsive**: Fully optimized for all devices

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Supabase account for backend services

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/skillmatch.git
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```
Fill in your environment variables in `.env.local`

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

## 🛠 Tech Stack

- **Frontend**: Next.js, TypeScript, TailwindCSS
- **Backend**: Supabase
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL (via Supabase)
- **Deployment**: Vercel

## 📱 Features in Detail

### For Employers
- Post job opportunities
- Browse worker profiles
- Direct messaging with candidates
- Company profile management
- Job application tracking

### For Workers
- Create professional profiles
- Showcase skills and experience
- Apply to jobs
- Real-time chat with employers
- Portfolio showcase

## 🔒 Security

- Secure authentication system
- Data encryption
- GDPR compliant
- Regular security audits

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for more details.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email support@skillmatch.com or join our Discord community.

## 🌐 Links

- [Website](https://skillmatchers.vercel.app)