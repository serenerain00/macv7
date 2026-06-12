import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import Cursor from "@/components/v2/Cursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.melissacasole.com"),
  title: {
    default: "Melissa Casole — Creative Technologist",
    template: "%s · Melissa Casole",
  },
  description:
    "When ideas are difficult to explain, I build them. Creative Technologist and Product Designer leveraging AI, code, design systems, and cognitive psychology to turn emerging concepts into tangible product experiences.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Melissa Casole — Creative Technologist",
    description:
      "When ideas are difficult to explain, I build them. AI, code, design systems, and cognitive psychology turned into real product experiences.",
    url: "https://www.melissacasole.com",
    siteName: "Melissa Casole",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#06070a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        <Cursor />
        {children}
      </body>
    </html>
  );
}
