import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User2, Menu, X, Sun, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@/components/theme-provider";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { setUser } from "@/redux/authSlice";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(theme === "dark" ? "light" : theme === "light" ? "dark" : systemTheme);
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        localStorage.removeItem("user");
        navigate("/");
        toast.success(res.data.message);
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Error in Logout:", error);
      toast.error("Error in Logout");
    }
  };

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center"
          >
            {/* <Link to="/" className="flex items-center space-x-2"> */}
            {/* <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-[#6A38C2] dark:from-white dark:to-[#8A6FC5] bg-clip-text text-transparent">
                Next<span className="text-[#6A38C2] dark:text-[#8A6FC5]">Career</span>
              </h1> */}
            {/* <img width={30} height={10} src="/Logo.png"/> */}
            {/* </Link> */}
            <Link to="/" className="flex items-center gap-2">
              <img src="/logo1.png" alt="NextCareer Logo" width={30} height={30} className="object-contain" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">NextCareer</span>
            </Link>

          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              {user && user.role === 'recruiter' ? (
                <div className="flex gap-6">
                  <Link to="/admin/companies" className="text-sm font-medium text-gray-600 hover:text-[#6A38C2] dark:text-gray-300 dark:hover:text-[#8A6FC5] transition-colors duration-200">
                    Companies
                  </Link>
                  <Link to="/admin/jobs" className="text-sm font-medium text-gray-600 hover:text-[#6A38C2] dark:text-gray-300 dark:hover:text-[#8A6FC5] transition-colors duration-200">
                    Jobs
                  </Link>
                </div>
              ) : (
                <div className="flex gap-6">
                  <Link to="/" className="text-sm font-medium text-gray-600 hover:text-[#6A38C2] dark:text-gray-300 dark:hover:text-[#8A6FC5] transition-colors duration-200">
                    Home
                  </Link>
                  <Link to="/jobs" className="text-sm font-medium text-gray-600 hover:text-[#6A38C2] dark:text-gray-300 dark:hover:text-[#8A6FC5] transition-colors duration-200">
                    Jobs
                  </Link>
                  <Link to="/browse" className="text-sm font-medium text-gray-600 hover:text-[#6A38C2] dark:text-gray-300 dark:hover:text-[#8A6FC5] transition-colors duration-200">
                    Browse
                  </Link>
                </div>
              )}
            </nav>

            <div className="flex items-center space-x-3 ml-2">
              {!user ? (
                <>
                  <Link to="/login">
                    <Button
                      variant="outline"
                      className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Button className="bg-gradient-to-r from-[#6A38C2] to-[#8A6FC5] hover:from-[#5A2DB0] hover:to-[#7A5FB5] text-white shadow-md hover:shadow-lg transition-all">
                        Sign Up
                      </Button>
                    </motion.div>
                  </Link>
                </>
              ) : (
                <Popover>
                  <PopoverTrigger asChild>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Avatar className="cursor-pointer h-9 w-9 border-2 border-transparent hover:border-[#6A38C2] dark:hover:border-[#8A6FC5] transition-all">
                        <AvatarImage src={user?.profile?.profilePhoto} alt="User avatar" />
                        <AvatarFallback className="bg-[#6A38C2] text-white">
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </motion.div>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-64 p-4 mt-2 shadow-xl rounded-lg bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border border-gray-200/50 dark:border-gray-800/50"
                    align="end"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user?.profile?.profilePhoto} alt="User avatar" />
                          <AvatarFallback className="bg-[#6A38C2] text-white">
                            {user.name?.charAt(0).toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{user.fullname || "User"}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{user.email || "Member"}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {user && user.role === 'student' && (
                          <Link to="/profile">
                            <Button variant="ghost" className="w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-800">
                              <User2 className="h-4 w-4 mr-2" />
                              <span>View Profile</span>
                            </Button>
                          </Link>
                        )}
                        <Button
                          variant="ghost"
                          onClick={logoutHandler}
                          className="w-full justify-start hover:bg-gray-100 dark:hover:bg-gray-800 text-red-600 dark:text-red-400"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          <span>Logout</span>
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="ml-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-gray-700 dark:text-gray-300"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </motion.div>
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 dark:text-gray-300"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden overflow-hidden"
            >
              <div className="pb-4 pt-2 space-y-4">
                <nav className="flex flex-col space-y-3 px-2">
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                  >
                    Home
                  </Link>
                  <Link
                    to="/jobs"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                  >
                    Jobs
                  </Link>
                  <Link
                    to="/browse"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                  >
                    Browse
                  </Link>
                </nav>
                {!user ? (
                  <div className="flex flex-col space-y-2 pt-2 px-2">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full">Login</Button>
                    </Link>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-[#6A38C2] to-[#8A6FC5] text-white">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="pt-2 space-y-2 px-2">
                    {user.role === 'student' && (
                      <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">
                          <User2 className="h-4 w-4 mr-2" />
                          <span>View Profile</span>
                        </Button>
                      </Link>
                    )}
                    <Button
                      onClick={() => {
                        logoutHandler();
                        setMobileMenuOpen(false);
                      }}
                      variant="ghost"
                      className="w-full justify-start text-red-600 dark:text-red-400"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      <span>Logout</span>
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;