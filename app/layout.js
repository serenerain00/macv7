import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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
  openGraph: {
    title: "Melissa Casole — Creative Technologist",
    description:
      "When ideas are difficult to explain, I build them. AI, code, design systems, and cognitive psychology turned into real product experiences.",
    url: "https://www.melissacasole.com",
    siteName: "Melissa Casole",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Melissa Casole — Creative Technologist",
    description: "When ideas are difficult to explain, I build them.",
  },
};

export const viewport = {
  themeColor: "#06070a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
