"use client";

import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { 
  HiMenu, HiX, HiUser, 
  HiOutlineLogout, HiOutlineViewGrid, 
  HiOutlineClipboardList, HiOutlineShieldCheck,
  HiOutlineSun, HiOutlineMoon 
} from "react-icons/hi";
import Image from "next/image";
import { UserContext } from "../context/UserContext";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const { user, logout } = useContext(UserContext);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  
  const { loggedIn, firstName, profileImage, role } = user;

  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getPages = () => {
    const basePages = [
      { title: "Dashboard", href: "/dashboard", icon: <HiOutlineViewGrid /> },
    ];

    if (role === "admin") {
      basePages.push({ title: "Admin Panel", href: "/admin", icon: <HiOutlineShieldCheck /> });
    } else {
      basePages.push({ title: "My Tasks", href: "/tasks", icon: <HiOutlineClipboardList /> });
    }

    return basePages;
  };

  const pages = getPages();

  if (!mounted) return null;

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-200 dark:border-white/5 py-3 shadow-sm" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
            <span className="text-white font-black text-xl italic">T</span>
          </div>
          <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter transition-colors">
            Time<span className="text-blue-500">Tracker</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-8">
            {pages.map((page) => (
              <Link
                key={page.title}
                href={page.href}
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white font-medium transition-colors text-sm flex items-center gap-2"
              >
                <span className="text-lg opacity-70">{page.icon}</span>
                {page.title}
              </Link>
            ))}
          </div>

          <div className="h-6 w-px bg-gray-200 dark:bg-white/10 mx-2"></div>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-yellow-400 transition-all border border-gray-200 dark:border-white/10"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
          </button>

          {!loggedIn ? (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm font-bold transition">
                Sign In
              </Link>
              <Link 
                href="/signUp" 
                className="bg-blue-600 text-white dark:bg-white dark:text-black px-6 py-2.5 rounded-xl text-sm font-black hover:opacity-90 transition-all shadow-xl shadow-blue-600/10 dark:shadow-white/5"
              >
                Join Free
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {/* Profile */}
              <Link
                href="/profile"
                className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 hover:border-blue-500/50 transition-all group"
              >
                {profileImage && profileImage !== "/user.png" ? (
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300 dark:border-white/20">
                    <Image
                      src={profileImage}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500">
                    <HiUser size={18} />
                  </div>
                )}
                <span className="text-sm font-bold text-gray-700 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-white">
                  {firstName || "Account"}
                </span>
              </Link>

              {/* Logout */}
              <button
                onClick={() => router.push("/logout")}
                className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-400/10 rounded-xl transition-all"
                title="Logout"
              >
                <HiOutlineLogout size={22} />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Toggle & Theme Button */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10"
          >
            {theme === "dark" ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
          </button>
          <button
            className="p-2 text-gray-900 dark:text-white bg-gray-100 dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/10"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-white/5 animate-in slide-in-from-top duration-300 shadow-2xl">
          <ul className="flex flex-col gap-2 p-6">
            {pages.map((page) => (
              <li key={page.title}>
                <Link
                  href={page.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 py-4 px-4 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl transition"
                >
                  <span className="text-xl text-blue-500">{page.icon}</span>
                  <span className="font-bold">{page.title}</span>
                </Link>
              </li>
            ))}
            
            <div className="h-px bg-gray-100 dark:bg-white/5 my-4"></div>

            {!loggedIn ? (
              <div className="grid grid-cols-2 gap-4">
                <Link href="/login" onClick={() => setIsOpen(false)} className="py-4 text-center text-gray-900 dark:text-white font-bold bg-gray-100 dark:bg-white/5 rounded-xl">Login</Link>
                <Link href="/signUp" onClick={() => setIsOpen(false)} className="py-4 text-center text-white font-bold bg-blue-600 rounded-xl">Register</Link>
              </div>
            ) : (
              <>
                <li>
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 py-4 px-4 bg-blue-600/5 dark:bg-blue-600/10 rounded-xl text-gray-900 dark:text-white border border-blue-600/10 dark:border-blue-600/20"
                  >
                    <HiUser size={20} className="text-blue-500" />
                    <span className="font-bold">{firstName || "My Profile"}</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="w-full flex items-center gap-4 py-4 px-4 text-red-500 hover:bg-red-50 dark:hover:bg-red-400/5 rounded-xl transition"
                  >
                    <HiOutlineLogout size={20} />
                    <span className="font-bold">Logout</span>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}