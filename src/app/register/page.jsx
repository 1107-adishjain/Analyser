'use client'
import { useState } from 'react';
import  {supabase} from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Mail, Lock } from 'lucide-react'; 

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else {
      alert('Check your email for verification link.');
      router.push('/login');
    }

    setIsLoading(false)
  }

  return (
    <div className="relative min-h-screen flex justify-center items-center overflow-hidden bg-gradient-to-br from-gray-700 via-gray-800 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Floating orbs */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full bg-gradient-to-r from-gold-400/20 to-amber-300/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: 120,
              height: 60,
              animationDuration: `${6 + Math.random() * 8}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}

        {/* Sparkle effects */}
        {/* {[...Array(20)].map((_, i) => (
          <Star
            key={`star-${i}`}
            className="absolute text-gray-100/40 animate-twinkle"
            size={Math.random() * 16 + 8}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 3}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))} */}

        {/* Gradient mesh overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-amber-500/10" />
      </div>

      {/* Main form container */}
      <div className="relative z-10 w-full max-w-md mx-4">
        {/* Crown decoration */}
        <div className="flex justify-center mb-8">
          {/* <div className="relative">
            <ScanFace className="w-16 h-16 text-amber-400 animate-pulse" />
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-6 h-6 text-yellow-300 animate-spin" style={{ animationDuration: "3s" }} />
            </div>
          </div> */}
        </div>

        {/* Form */}
        <form
          onSubmit={handleRegister}
          className="relative bg-gradient-to-br from-slate-800/90 via-gray-600 to-gray-900/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-amber-500/20 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-amber-500/20"
        >
          {/* Decorative border glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-gray-500/20 via-gray-500/20 to-gray-500/20 blur-sm -z-10" />

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 bg-clip-text text-transparent mb-2">
              Register your account 
            </h2>
            {/* <p className="text-slate-300 text-sm font-medium">Join the elite circle</p> */}
          </div>

          {/* Email field */}
          <div className="mb-6">
            <label className=" text-amber-200 text-sm font-semibold mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Enter Email
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-4 pl-12 rounded-xl bg-slate-800/50 border-2 border-slate-600/50 text-white placeholder-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all duration-300 backdrop-blur-sm"
              />
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
          </div>

          {/* Password field */}
          <div className="mb-8">
            <label className="block text-amber-200 text-sm font-semibold mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Enter password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-4 pl-12 rounded-xl bg-slate-800/50 border-2 border-slate-600/50 text-white placeholder-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all duration-300 backdrop-blur-sm"
              />
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full relative overflow-hidden bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 hover:from-gray-500 hover:via-gray-400 hover:to-gray-500 text-slate-900 font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-slate-500/5 border-t-slate-900 rounded-full animate-spin" />
                  <span>...</span>
                </>
              ) : (
                <>
                  {/* <Crown className="w-5 h-5" /> */}
                  Submit
                </>
              )}
            </span>

            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>

          {/* Decorative elements */}
          <div className="flex justify-center mt-6 space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-gray-400/60 animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </form>

        {/* Footer text */}
        <p className="text-center text-slate-400 text-sm mt-6">
          Already part of the royal family?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-amber-400 hover:text-amber-300 font-semibold transition-colors duration-200"
          >
            Enter the Palace
          </button>
        </p>
      </div>
     

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 0.6;
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-twinkle {
          animation: twinkle ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
