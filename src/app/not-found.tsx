'use client';

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-zinc-900 to-black text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        {/* Big Error Code */}
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-8xl font-bold bg-gradient-to-r from-fuchsia-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg"
        >
          404
        </motion.h1>

        {/* Message */}
        <h2 className="mt-4 text-2xl font-semibold">
          Oops! Page Not Found
        </h2>
        <p className="mt-2 text-gray-400">
          The page you are looking for might have been removed,  
          had its name changed, or is temporarily unavailable.
        </p>

        {/* Action Button */}
        <Button
          onClick={() => router.push("/")}
          className="mt-8 px-6 py-6 bg-gradient-to-r from-fuchsia-600 to-cyan-500 hover:from-fuchsia-500 hover:to-cyan-400 rounded-xl text-lg shadow-lg cursor-pointer"
        >
          Go Back Home
        </Button>
      </motion.div>
    </div>
  );
}
