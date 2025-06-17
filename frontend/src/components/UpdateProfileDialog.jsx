import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2, Upload, User, Mail, Phone, BookOpen, FileText } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from "../utils/constant.js";
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);
  const [preview, setPreview] = useState(user?.profile?.profilePhoto || "");
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills?.join(', ') || '',
    file: null
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput(prev => ({ ...prev, file }));
      if (file.type.startsWith('image/')) {
        setPreview(URL.createObjectURL(file));
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success(
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>{res.data.message}</span>
          </div>,
          {
            description: "Profile updated successfully",
            duration: 3000,
          }
        );
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        <div className="flex items-center gap-2">
          <span className="text-red-500">✗</span>
          <span>{error?.response?.data?.message || "Something went wrong"}</span>
        </div>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]" aria-describedby="profile-update-description">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl">Update Your Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile information and save to update.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={submitHandler} className="mt-4">
            <div className="grid gap-6">

              {/* Profile Picture */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-20 w-20 border-2 border-[#638C2D]/20">
                    <AvatarImage src={preview} alt="Profile" />
                    <AvatarFallback className="bg-[#638C2D]/10 text-[#638C2D]">
                      {input.fullname.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex-1">
                  <Label htmlFor="profile-photo" className="mb-2 block">Profile Photo</Label>
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="profile-photo"
                      className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Upload</span>
                    </Label>
                    <Input
                      id="profile-photo"
                      type="file"
                      accept="image/*"
                      onChange={fileChangeHandler}
                      className="hidden"
                    />
                    {preview && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setPreview("")}
                        className="text-red-500 hover:text-red-600 dark:hover:text-red-400"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullname" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-[#638C2D]" />
                    Full Name
                  </Label>
                  <Input
                    id="fullname"
                    name="fullname"
                    value={input.fullname}
                    onChange={changeEventHandler}
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#638C2D]" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={input.email}
                    onChange={changeEventHandler}
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#638C2D]" />
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={input.phoneNumber}
                    onChange={changeEventHandler}
                    placeholder="+1 234 567 890"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-[#638C2D]" />
                    Bio
                  </Label>
                  <Input
                    id="bio"
                    name="bio"
                    value={input.bio}
                    onChange={changeEventHandler}
                    placeholder="Tell us about yourself"
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="skills" className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#638C2D]" />
                    Skills (comma separated)
                  </Label>
                  <Input
                    id="skills"
                    name="skills"
                    value={input.skills}
                    onChange={changeEventHandler}
                    placeholder="React, Node.js, UI/UX, etc."
                  />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="resume" className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-[#638C2D]" />
                    Resume (PDF)
                  </Label>
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="resume"
                      className="flex-1 flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Upload Resume</span>
                    </Label>
                    <Input
                      id="resume"
                      type="file"
                      accept="application/pdf"
                      onChange={fileChangeHandler}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <motion.div 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full"
              >
                <Button 
                  type="submit" 
                  className="w-full gap-2 bg-[#638C2D] hover:bg-[#557A25]"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </motion.div>
            </DialogFooter>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;