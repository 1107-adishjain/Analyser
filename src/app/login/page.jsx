'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from 'next/navigation'; 
import { default as safeSupabase } from "@/lib/supabase";
import { motion } from "framer-motion";

export default function Login() {
  const router = useRouter(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setLoading(true);

    try {
      const { data, error } = await safeSupabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error("Login error:", error);
        alert(error.message);
        return;
      }

      console.log("Login successful:", data.user);
      router.push('/');
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-gray-900/70 backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold tracking-wide">Welcome Back</h1>
          <p className="text-gray-400 mt-2">Please sign in to continue</p>
        </div>

        {/* Google Login */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-full bg-white text-gray-900 font-semibold rounded-lg px-4 py-2 shadow-md cursor-pointer hover:bg-gray-200 transition duration-300"
        >
          <img src="icons8-google.svg" alt="Google Logo" className="w-5 h-5 mr-2" />
          Sign in with Google
        </motion.button>

        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-700" />
          <span className="px-3 text-gray-400 text-sm">or</span>
          <hr className="flex-1 border-gray-700" />
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-gray-600 rounded-lg p-3 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-gray-600 rounded-lg p-3 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
              required
            />
          </div>

          <Button 
            variant="outline"
            type="submit" 
            disabled={loading || !email || !password}
            className="w-full py-3 rounded-lg font-semibold shadow-md hover:bg-gray-700 transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link href="/register" className="text-gray-200 font-semibold underline hover:text-white transition">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
