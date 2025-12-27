"use client";

import { useState, useEffect, useCallback, useContext } from "react";
import ProfileView from "./components/ProfileView";
import ProfileEdit from "./components/ProfileEdit";
import { UserContext } from "../context/UserContext";
import { supabase } from "@/lib/db";

export default function ProfileSidebar() {
  const { user, login } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("/user.png");
  const [role, setRole] = useState("User");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    if (user.loggedIn) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      });
      setRole(user.role || "User");
      setProfileImage(user.profileImage || "/user.png");
    }
  }, [user]);

  const handleChange = useCallback((key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleImageChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setProfileImage(reader.result);
    reader.readAsDataURL(file);
  }, []);

  const handleSubmit = async () => {
    const userId = user.id;
    if (!userId) return;

    setIsUploading(true);
    try {
      let finalImageUrl = profileImage;

      if (selectedFile) {
        const fileExt = selectedFile.name.split(".").pop();
        const filePath = `${user.id}/${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, selectedFile, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);

        finalImageUrl = publicUrlData.publicUrl;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          firstName: form.firstName,
          lastName: form.lastName,
          profileImage: finalImageUrl,
        },
      });

      if (updateError) throw updateError;

      login({
        id: userId,
        role: role,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        profileImage: finalImageUrl,
      });

      setIsOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error.message);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-white flex justify-center pt-32 pb-20 px-4 relative overflow-hidden transition-colors duration-500">
      
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-125 h-125 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-75 h-75 bg-purple-500/5 dark:bg-purple-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black tracking-tight mb-2 text-slate-900 dark:text-white">
            User <span className="text-blue-600 dark:text-blue-500">Profile</span>
          </h1>
          <p className="text-slate-500 dark:text-gray-500 font-medium tracking-wide uppercase text-[10px]">
            Manage your personal identity and security
          </p>
        </div>

        <div className="bg-white/80 dark:bg-white/3 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[2.5rem] shadow-xl dark:shadow-2xl overflow-hidden group transition-all">
          <div className="p-8 md:p-12 relative">
            
            {isUploading && (
              <div className="absolute inset-0 bg-white/60 dark:bg-[#0a0a0a]/80 backdrop-blur-md flex flex-col items-center justify-center z-50">
                <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                <p className="font-black text-xs uppercase tracking-[0.2em] text-blue-600 dark:text-blue-500 animate-pulse">Syncing Data...</p>
              </div>
            )}

            {!isOpen ? (
              <ProfileView
                profileImage={profileImage}
                {...form}
                role={role}
                onEdit={() => setIsOpen(true)}
              />
            ) : (
              <ProfileEdit
                formFirstName={form.firstName}
                formLastName={form.lastName}
                formEmail={form.email}
                onChange={handleChange}
                onImageChange={handleImageChange}
                onCancel={() => setIsOpen(false)}
                onSubmit={handleSubmit}
              />
            )}
          </div>

          <div className="h-2 w-full bg-linear-to-r from-transparent via-blue-600/20 dark:via-blue-500/20 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}