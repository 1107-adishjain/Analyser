'use client'
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock } from "lucide-react";

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else {
      alert('Check your email for verification link.');
      router.push('/login');
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md mx-4"
      >
        <form
          onSubmit={handleRegister}
          className="relative bg-gradient-to-br from-gray-800/90 via-gray-700 to-gray-900/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-gray-600 transition-all duration-500 hover:shadow-gray-500/20"
        >
          
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold tracking-wide bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-gray-400 text-sm mt-2">Join our community</p>
          </div>

          
          <div className="mb-6">
            <label className="text-gray-300 text-sm font-semibold mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-4 pl-12 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-gray-400 focus:ring-2 focus:ring-gray-400/40 outline-none transition-all"
              />
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>
          </div>

          
          <div className="mb-8">
            <label className="text-gray-300 text-sm font-semibold mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-4 pl-12 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:border-gray-400 focus:ring-2 focus:ring-gray-400/40 outline-none transition-all"
              />
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isLoading}
            className="w-full relative overflow-hidden bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-gray-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <span className="relative z-10">
              {isLoading ? "Registering..." : "Register"}
            </span>
          
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </motion.button>
        </form>

        
        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-gray-200 hover:text-white font-semibold transition-colors"
          >
            Login here
          </button>
        </p>
      </motion.div>
    </div>
  )
}
