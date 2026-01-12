import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import {
  UserPlus,
  LogIn,
  ArrowRight,
  Mail,
  User,
  Lock,
  Phone,
  Image as ImageIcon,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, signup } = useUser();
  const navigate = useNavigate();

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); 
    if (value.length <= 10) {
      setPhone(value);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        setError("Image size too large. Please select an image under 1MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLogin && phone.length !== 10) {
      setError("Mobile number must be exactly 10 digits.");
      return;
    }

    setIsLoading(true);


    await new Promise((resolve) => setTimeout(resolve, 800));

    if (isLogin) {
      const result = login(email, password);
      if (result.success) {
        navigate("/");
      } else {
        setError(result.message || "Login failed.");
        setIsLoading(false);
      }
    } else {
      if (signup(name, email, password, avatar, phone)) {
        navigate("/");
      } else {
        setError("This email is already registered. Try logging in instead.");
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 font-sans transition-colors duration-300">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-purple/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-card-orange/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-[1000px] grid grid-cols-1 md:grid-cols-2 bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100 transition-all">
        <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-[#1E1E1E] to-[#3A3A3A] text-white">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
                <CheckCircle2 className="text-accent-purple" size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight">
                TaskMaster
              </span>
            </div>
            <h2 className="text-4xl font-bold leading-tight mb-6">
              Organize your work{" "}
              <span className="text-accent-purple">efficiently</span> and
              beautifully.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Join thousands of professionals who manage their daily tasks with
              precision and style.
            </p>
          </div>

          <div className="space-y-6">
            <div className="relative bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[3.5rem] shadow-2xl border border-white/50 w-full max-w-lg transition-all">
              <div className="w-10 h-10 rounded-full bg-accent-purple/20 flex items-center justify-center">
                <ShieldCheck size={20} className="text-accent-purple" />
              </div>
              <div>
                <p className="font-semibold">Secure & Private</p>
                <p className="text-sm text-gray-400">
                  Your data is stored locally in your browser.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 flex flex-col justify-center max-h-[90vh] overflow-y-auto custom-scrollbar">
          <div className="mb-10">
            <h2 className="text-4xl font-black text-gray-800 mb-2">
              {isLogin ? "Welcome Back!" : "Join Us!"}
            </h2>
            <p className="text-gray-500 font-medium">
              {isLogin
                ? "Please enter your details to sign in"
                : "Start managing your tasks effectively today"}
            </p>
          </div>

          <div className="flex bg-gray-100/50 p-1.5 rounded-2xl mb-10">
            <button
              onClick={() => {
                setIsLogin(true);
                setError("");
              }}
              className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                isLogin
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError("");
              }}
              className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                !isLogin
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-1.5 animate-slide-down">
                  <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-wider">
                    Full Name
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent-purple transition-colors">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-accent-purple focus:bg-white focus:ring-4 focus:ring-accent-purple/5 transition-all outline-none text-sm text-gray-900"
                      placeholder="e.g. Alex Johnston"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 animate-slide-down">
                  <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-wider">
                    Profile Photo
                  </label>
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 border border-dashed border-gray-200 hover:border-accent-purple hover:bg-purple-50/30 transition-all cursor-pointer relative group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer z-20"
                    />
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-white shadow-sm overflow-hidden flex items-center justify-center shrink-0">
                      {avatar ? (
                        <img
                          src={avatar}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon size={20} className="text-gray-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-700 group-hover:text-accent-purple transition-colors">
                        {avatar ? "Change Photo" : "Upload Photo"}
                      </p>
                      <p className="text-[10px] text-gray-400 font-medium">
                        JPG, PNG (Max 1MB)
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-accent-purple transition-all">
                      <UserPlus size={16} />
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 animate-slide-down">
                  <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-wider">
                    Phone Number
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent-purple transition-colors">
                      <Phone size={18} />
                    </div>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={handlePhoneChange}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-accent-purple focus:bg-white focus:ring-4 focus:ring-accent-purple/5 transition-all outline-none text-sm text-gray-900"
                      placeholder="e.g. 9876543210"
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent-purple transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-accent-purple focus:bg-white focus:ring-4 focus:ring-accent-purple/5 transition-all outline-none text-sm text-gray-900"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-wider">
                Password
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent-purple transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-accent-purple focus:bg-white focus:ring-4 focus:ring-accent-purple/5 transition-all outline-none text-sm text-gray-900"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm font-bold text-accent-purple hover:text-card-purple transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-3 bg-red-50 text-red-600 p-3.5 rounded-xl text-xs font-medium animate-shake border border-red-100">
                <AlertCircle size={16} className="shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full h-[54px] bg-primary text-white rounded-xl font-bold text-base hover:shadow-lg hover:translate-y-[-2px] active:translate-y-[0] transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {isLogin ? "Sign In" : "Register Now"}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400 text-[10px] uppercase tracking-widest font-bold">
            Locked & Secured with local-storage
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
