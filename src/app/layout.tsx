import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from 'react-hot-toast';
import { ProfileProvider } from '@/components/providers/profile';

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: "SkillMatchers - Find Your Perfect Skill Match",
  description: "Connect with mentors and collaborators who complement your journey",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${outfit.variable}`}>
      <body>
        <ProfileProvider>
          <Toaster position="top-center" />
          <Header />
          {children}
          <Footer />
        </ProfileProvider>
      </body>
    </html>
  );
}
