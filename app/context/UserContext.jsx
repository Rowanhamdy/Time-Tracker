"use client";
import { createContext, useState, useEffect, useCallback } from "react"; 
import { useRouter } from "next/navigation";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState({
    loggedIn: false,
    id: null,
    role: "",
    firstName: "",
    lastName: "",
    email: "",
    profileImage: "/user.png",
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const storedId = localStorage.getItem("Id");

    if (token && storedId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser({
        loggedIn: true,
        id: storedId, 
        role: localStorage.getItem("role") || "user",
        firstName: localStorage.getItem("firstName") || "",
        lastName: localStorage.getItem("lastName") || "",
        email: localStorage.getItem("email") || "",
        profileImage: localStorage.getItem("profileImage") || "/user.png",
      });
    }
  }, []);

 const login = ({ id, role, firstName, lastName, email, profileImage }) => {
    localStorage.setItem("accessToken", "true");
    localStorage.setItem("Id", id); 
    localStorage.setItem("role", role);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("email", email);
    localStorage.setItem("profileImage", profileImage || "/user.png");

    setUser({
      loggedIn: true,
      id: id,
      role,
      firstName,
      lastName,
      email,
      profileImage: profileImage || "/user.png",
    });
  };

const logout = useCallback(() => {
  localStorage.clear();
  setUser({
    loggedIn: false,
    id: null,
    role: "user",
    firstName: "",
    lastName: "",
    email: "",
    profileImage: "/user.png"
  });
  router.push("/");
}, [router]);
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};