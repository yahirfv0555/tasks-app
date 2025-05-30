import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from '@/components/footer';
import { MessageProvider } from "@/providers/messages/message-provider";
import { LoaderProvider } from "@/providers/loader/loader-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const RootLayout = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MessageProvider>
          <LoaderProvider>
            {children}
            <Footer/>
          </LoaderProvider>
        </MessageProvider>
      </body>
    </html>
  );
}

export default RootLayout;
