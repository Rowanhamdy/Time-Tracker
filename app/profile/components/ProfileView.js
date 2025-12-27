import Image from "next/image";

export default function ProfileView({
  profileImage,
  firstName,
  lastName,
  email,
  role,
  onEdit,
}) {
  return (
    <div className="flex flex-col items-center text-center gap-4">
      <div className="relative w-32 h-32">
        <Image
          src={profileImage || "/user.png"}
          alt="User Profile"
          fill
          priority
          sizes="(max-width: 768px) 40px, 40px"
          className="rounded-full object-cover"
        />
      </div>

      <div className="space-y-1">
        <p className="text-lg font-semibold">
          {firstName} {lastName}
        </p>
        <p className="text-gray-500">{email}</p>
        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {role}
        </span>
      </div>

      <button
        onClick={onEdit}
        className="mt-4 bg-cyan-900 hover:bg-cyan-800 text-white px-6 py-2 rounded-lg transition"
      >
        Edit Profile
      </button>
    </div>
  );
}
