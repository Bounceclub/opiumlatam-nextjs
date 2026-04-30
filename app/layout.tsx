import type { Metadata, Viewport } from "next";
import { Anton, Barlow_Condensed, Source_Serif_4, DM_Sans } from "next/font/google";
import "./globals.css";
import PushNotificationPrompt from "@/components/PushNotificationPrompt";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["400", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
});

const sourceSerif = Source_Serif_4({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-source-serif",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "OpiumLATAM - Noticias de Hip-Hop en español",
  description: "Noticias de Hip-Hop en español para Latinoamérica",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suppress hydration warnings from browser extensions
              if (typeof window !== 'undefined') {
                const originalError = console.error;
                console.error = (...args) => {
                  if (typeof args[0] === 'string' && args[0].includes('hydration')) {
                    return;
                  }
                  originalError.apply(console, args);
                };
              }
            `,
          }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-SNRQY97T7V"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SNRQY97T7V');
            `,
          }}
        />
      </head>
      <body
        className={`${anton.variable} ${barlowCondensed.variable} ${sourceSerif.variable} ${dmSans.variable}`}
      >
        {children}
        <PushNotificationPrompt />
      </body>
    </html>
  );
}
