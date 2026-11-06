import type { Metadata, Viewport } from "next";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {
  Bricolage_Grotesque,
  Manrope,
  JetBrains_Mono,
  IBM_Plex_Sans_Arabic,
} from "next/font/google";
import '../globals.css';


const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mariyam-chemrah.dev";
const NAME = "Mariyam Chemrah";
const ROLE = "Senior Full-Stack Engineer";
const DESCRIPTION =
  "Mariyam Chemrah — senior full-stack engineer with 8+ years building SaaS platforms, REST APIs, dashboards and e-commerce with PHP (Laravel, Symfony), React, Next.js and TypeScript. Based in Casablanca, open to remote and international work.";

const LINKEDIN = process.env.LINKEDIN_URL ?? "https://www.linkedin.com/in/mariyam-chemrah-2a236199/";
const GITHUB = process.env.GITHUB_URL ?? "https://github.com/Mariyame";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-bricolage",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600"],
  variable: "--font-arabic-face",
  display: "swap",
  preload: false, 
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F3F5EF" }, // paper
    { media: "(prefers-color-scheme: dark)", color: "#0D1411" },  // night soil
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${NAME} — ${ROLE}`,
    template: `%s · ${NAME}`,
  },
  description: DESCRIPTION,
  applicationName: NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  category: "technology",
  classification: "Portfolio",

  authors: [{ name: NAME, url: SITE_URL }],
  creator: NAME,
  publisher: NAME,
  keywords: [
    "Mariyam Chemrah",
    "senior full-stack engineer",
    "full-stack developer",
    "freelance developer Morocco",
    "Laravel developer",
    "Symfony developer",
    "PHP developer",
    "React developer",
    "Next.js developer",
    "TypeScript",
    "REST API",
    "SaaS development",
    "e-commerce development",
    "remote developer",
    "Casablanca",
  ],

  alternates: {
    canonical: "/",
    languages: {
      "en": "/",
      "fr": "/fr",
      "ar": "/ar",
      "x-default": "/",
    },
  },

  openGraph: {
    type: "profile",
    firstName: "Mariyam",
    lastName: "Chemrah",
    username: "Mariyame",
    url: "/",
    siteName: NAME,
    title: `${NAME} — ${ROLE}`,
    description:
      "Deep roots in the back end, a canopy in React. 8+ years building SaaS, APIs and e-commerce. Open to remote & international roles and freelance projects.",
    locale: "en_US",
    alternateLocale: ["fr_FR", "ar_MA"],
    images: [
      {
        url: "/og/og-default.png", 
        width: 1200,
        height: 630,
        alt: `${NAME} — ${ROLE}. Choose your path: build a project or hire an engineer.`,
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${NAME} — ${ROLE}`,
    description:
      "Deep roots in the back end, a canopy in React. SaaS, APIs, e-commerce · Laravel · Symfony · React · Next.js.",
    images: [{ url: "/og/og-default.png", alt: `${NAME} — ${ROLE}` }],
    creator: "@mariyamchemrah",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },                        // legacy + Safari < 17
      { url: "/brand/favicon.svg", type: "image/svg+xml" },           // modern browsers
      { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/brand/logo-mark.svg", color: "#2F6B3F" }],
  },

  manifest: "/manifest.webmanifest", 

  appleWebApp: {
    capable: true,
    title: "Mariyam",
    statusBarStyle: "black-translucent",
  },

  formatDetection: {
    telephone: false, 
    email: false,
    address: false,
  },

  verification: {
    google: "GOOGLE_SEARCH_CONSOLE_TOKEN",
  },

  other: {
    "msapplication-TileColor": "#0D1411",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: NAME,
      givenName: "Mariyam",
      familyName: "Chemrah",
      jobTitle: ROLE,
      description: DESCRIPTION,
      url: SITE_URL,
      image: `${SITE_URL}/og/og-default.png`,
      email: "mailto:mariam.chemrah@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Casablanca",
        addressCountry: "MA",
      },
      knowsLanguage: ["ar", "fr", "en"],
      knowsAbout: [
        "PHP", "Laravel", "Symfony", "React", "Next.js", "TypeScript",
        "REST APIs", "SaaS", "E-commerce", "Docker", "MySQL", "MongoDB",
      ],
      alumniOf: { "@type": "CollegeOrUniversity", name: "Université Paris 13" },
      sameAs: [LINKEDIN, GITHUB],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: NAME,
      inLanguage: ["en", "fr", "ar"],
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
};


export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      data-theme="work"
      suppressHydrationWarning
      className={`${bricolage.variable} ${manrope.variable} ${jetbrains.variable} ${arabic.variable}`}
    >
      <body className="min-h-dvh bg-bg font-sans text-fg antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:inset-s-4 focus:top-4 focus:z-50 focus:rounded-pill focus:bg-inverse focus:px-5 focus:py-3 focus:text-on-inverse"
        >
          Skip to main content
        </a>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}