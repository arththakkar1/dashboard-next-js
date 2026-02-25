import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AppShellProvider } from "@/components/AppShellProvider";
import AppShell from "@/components/AppShell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Spice Kitchen - Restaurant Dashboard",
    template: "%s | Spice Kitchen",
  },
  description:
    "Spice Kitchen is a modern Indian restaurant management dashboard. Track orders, manage menus, handle reservations, view analytics, and coordinate staff — all in one place.",
  keywords: [
    "Indian restaurant",
    "restaurant dashboard",
    "restaurant management",
    "Spice Kitchen",
    "order management",
    "menu management",
    "table reservations",
    "restaurant analytics",
    "staff management",
    "POS system",
  ],
  authors: [{ name: "Spice Kitchen" }],
  creator: "Spice Kitchen",
  publisher: "Spice Kitchen",
  metadataBase: new URL("https://spicekitchen.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Spice Kitchen",
    title: "Spice Kitchen - Restaurant Dashboard",
    description:
      "Modern Indian restaurant management dashboard — orders, menu, reservations, analytics & staff in one place.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Spice Kitchen Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spice Kitchen - Restaurant Dashboard",
    description:
      "Modern Indian restaurant management dashboard — orders, menu, reservations, analytics & staff in one place.",
    images: ["/og-image.png"],
    creator: "@spicekitchen",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <AppShellProvider>
            <AppShell>{children}</AppShell>
          </AppShellProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
