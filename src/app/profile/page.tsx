"use client";

import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import {
  User,
  LogOut,
  Mail,
  Settings,
  Edit,
  Shield,
  Calendar,
  Globe,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-900 text-white">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 rounded-lg text-gray-400">
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291
                 A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824
                 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading your session...
        </div>
      </div>
    );
  }

if (status !== "authenticated") {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 via-zinc-900 to-black text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-10 text-center"
      >
        {/* Lock Icon */}
        <div className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 shadow-lg mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 11V7a4 4 0 118 0v4m-2 0h2a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2h2"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-white">
          Login Required
        </h1>

        {/* Description */}
        <p className="mt-4 text-gray-300 leading-relaxed">
          You must be logged in to access this page’s content.  
          Please sign in to continue.
        </p>

        {/* Button */}
        <Button
          onClick={() => router.push("/")}
          className="mt-8 w-full py-6 text-lg font-medium bg-gradient-to-r from-fuchsia-600 to-cyan-500 hover:from-fuchsia-500 hover:to-cyan-400 shadow-lg rounded-xl transition-transform transform hover:scale-[1.02] cursor-pointer"
        >
          Sign In Now
        </Button>
      </motion.div>
    </div>
  );
}


  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-zinc-900 to-black text-white overflow-hidden p-4 flex items-center justify-center">
      {/* Glow Background */}
      <motion.div
        className="absolute top-[-100px] left-[-100px] w-80 h-80 rounded-full bg-fuchsia-600/20 blur-3xl"
        animate={{ opacity: [0.2, 0.3, 0.2], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-120px] right-[-120px] w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl"
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 w-full max-w-5xl">
        {/* Back Button */}
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="text-white bg-white/5 border flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 text-5xl md:text-6xl font-bold bg-gradient-to-r from-fuchsia-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg"
        >
          Your Profile
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Profile Card */}
          <div className="md:col-span-1 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="flex flex-col items-center">
              {session.user?.image && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="mb-4 rounded-full overflow-hidden border-4 border-fuchsia-500/40 shadow-lg relative"
                >
                  <Image
                    src={session.user.image}
                    alt="User profile"
                    width={120}
                    height={120}
                    className="w-28 h-28 object-cover rounded-full"
                  />
                  <button className="absolute bottom-0 right-0 bg-fuchsia-600/90 hover:bg-fuchsia-500 rounded-full p-2 shadow-lg">
                    <Edit className="h-4 w-4" />
                  </button>
                </motion.div>
              )}

              <h2 className="text-2xl font-semibold">{session.user?.name}</h2>
              {session.user?.companyName && (
                <p className="text-sm text-cyan-400">
                  {session.user.companyName}
                </p>
              )}

              <p className="mt-2 text-gray-400 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {session.user?.email}
              </p>

              <div className="mt-6 pt-6 border-t border-white/10 w-full space-y-4">
                <ProfileInfo
                  icon={
                    <Shield
                      className={`h-4 w-4 ${
                        session.user?.isVerified
                          ? "text-cyan-400"
                          : "text-gray-500"
                      }`}
                    />
                  }
                  label={
                    session.user?.isVerified ? "Verified Account" : "Unverified"
                  }
                />
                <ProfileInfo
                  icon={<User className="h-4 w-4 text-purple-400" />}
                  label={`Role: ${session.user?.role}`}
                />
                <ProfileInfo
                  icon={<Calendar className="h-4 w-4 text-fuchsia-400" />}
                  label={`Member since ${new Date(
                    session.expires
                  ).toLocaleDateString()}`}
                />
                <ProfileInfo
                  icon={<Globe className="h-4 w-4 text-green-400" />}
                  label={`${session.user?.roadOrArea}, ${session.user?.cityOrState}, ${session.user?.country} - ${session.user?.postalCode}`}
                />
              </div>

              {session.user?.phone && (
                <div className="mt-4 text-sm text-gray-400">
                  📞 {session.user.phone}
                </div>
              )}

              <div className="mt-8 w-full">
                <Button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full bg-gradient-to-r from-fuchsia-600 to-cyan-500 hover:from-fuchsia-500 hover:to-cyan-400 group shadow-lg cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform " />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="md:col-span-2 space-y-8">
            <DetailCard
              title="Account Settings"
              icon={<Settings className="h-5 w-5 text-fuchsia-400" />}
              edit
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Full Name">
                  {session.user?.name || "Not provided"}
                </Field>
                <Field label="Username">
                  @
                  {session.user?.name?.toLowerCase().replace(/\s+/g, "") ||
                    "user"}
                </Field>
              </div>
              <Field label="Email Address">{session.user?.email}</Field>
            </DetailCard>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ProfileInfo({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 text-sm text-gray-300 bg-white/5 px-4 py-2 rounded-lg border border-white/10">
      {icon}
      <span>{label}</span>
    </div>
  );
}

function DetailCard({
  title,
  icon,
  children,
  edit,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  edit?: boolean;
}) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          {icon}
          {title}
        </h3>
        {edit && (
          <Button
            variant="outline"
            size="sm"
            className="border-fuchsia-500/50 text-fuchsia-400"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        )}
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label className="text-gray-400">{label}</Label>
      <div className="mt-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-gray-200">
        {children}
      </div>
    </div>
  );
}
