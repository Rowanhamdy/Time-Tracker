import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Time Tracker",
    template: "%s | Time Tracker",
  },
  description:
    "Time Tracker helps you manage tasks, track time, and improve productivity efficiently.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        <UserProvider>
          <ThemeProvider>
            <Navbar />
            <main className="min-h-screen">
               {children}
            </main>
            <Footer />
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}