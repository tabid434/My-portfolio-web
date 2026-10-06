import type { Metadata } from "next";
import { DM_Mono, Space_Grotesk, Manrope } from "next/font/google";
import { Providers } from "@/components/site-shell";
import { contact } from "@/lib/portfolio";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Talha Abid — Full-Stack Developer & Software Engineer",
  description:
    "Talha Abid engineers mobile, web, and AI-assisted applications with React Native, React, Next.js, TypeScript, and Node.js. Explore real product work and frontend architecture.",
  metadataBase: new URL(process.env.SITE_URL || "https://develoverz.netlify.app"),
  alternates: { canonical: "/" },
  authors: [{ name: "Talha Abid" }],
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Talha Abid | Full-Stack Developer & Software Engineer",
    description: "React Native, React, Next.js, TypeScript, and production systems.",
    type: "website",
    url: "/",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Talha Abid | Full-Stack Developer",
    description: "Engineering digital products where thoughtful design meets production-grade technology.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${manrope.variable} ${spaceGrotesk.variable} ${dmMono.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: "try{var d=document.documentElement,p=location.pathname==='/'&&!location.hash&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&!sessionStorage.getItem('abid-intro');d.dataset.intro=p?'on':'off';if(p)sessionStorage.setItem('abid-intro','1')}catch(e){document.documentElement.dataset.intro='off'}" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "Person", name: "Talha Abid", jobTitle: "Software Engineer",
          url: process.env.SITE_URL || "https://develoverz.netlify.app", email: contact.email,
          sameAs: [contact.github, contact.linkedin], alumniOf: { "@type": "CollegeOrUniversity", name: "Gift University" },
          knowsAbout: ["React Native", "React", "Next.js", "TypeScript", "Node.js", "Frontend architecture", "AI-assisted applications"],
        }).replace(/</g, "\\u003c") }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
