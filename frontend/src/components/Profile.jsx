import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen, FileText, Download } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import { motion } from 'framer-motion';
const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);
  useGetAppliedJobs();

  // User data with fallbacks
  const profileData = {
    fullname: user?.fullname || "No Name",
    email: user?.email || "No Email",
    bio: user?.profile?.bio || "Tell us about yourself",
    phoneNumber: user?.phoneNumber || "Not provided",
    skills: user?.profile?.skills || [],
    resume: user?.profile?.resume,
    resumeName: user?.profile?.resumeOriginalName || "No resume uploaded",
    profilePhoto: user?.profile?.profilePhoto
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Navbar />
      
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8"
      >
        {/* Profile Card */}
        <motion.div 
          variants={itemVariants}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row justify-between gap-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-2 border-[#638C2D]/20">
                <AvatarImage src={profileData.profilePhoto} alt="profile" />
                <AvatarFallback className="bg-[#638C2D]/10 text-[#638C2D]">
                  {profileData.fullname.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {profileData.fullname}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {profileData.bio}
                </p>
              </div>
            </div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => setOpen(true)} 
                variant="outline" 
                className="gap-2 text-[#638C2D] border-[#638C2D] hover:bg-[#638C2D]/10"
              >
                <Pen className="h-4 w-4" />
                Edit Profile
              </Button>
            </motion.div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#638C2D]" />
                <div>
                  <Label className="text-sm text-gray-500 dark:text-gray-400">Email</Label>
                  <p className="text-gray-900 dark:text-white">{profileData.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Contact className="h-5 w-5 text-[#638C2D]" />
                <div>
                  <Label className="text-sm text-gray-500 dark:text-gray-400">Phone</Label>
                  <p className="text-gray-900 dark:text-white">{profileData.phoneNumber}</p>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-sm text-gray-500 dark:text-gray-400">Skills</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {profileData.skills.length > 0 ? (
                  profileData.skills.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary"
                      className="bg-[#638C2D]/10 text-[#638C2D] hover:bg-[#638C2D]/20"
                    >
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-500 dark:text-gray-400">No skills added</span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Label className="text-sm text-gray-500 dark:text-gray-400">Resume</Label>
            {profileData.resume ? (
              <motion.a
                whileHover={{ scale: 1.02 }}
                href={profileData.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <FileText className="h-5 w-5 text-[#638C2D]" />
                <span>{profileData.resumeName}</span>
                <Download className="h-4 w-4 ml-2" />
              </motion.a>
            ) : (
              <p className="mt-2 text-gray-500 dark:text-gray-400">No resume uploaded</p>
            )}
          </div>
        </motion.div>

        {/* Applied Jobs Section */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Applied Jobs</h2>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm">
            <AppliedJobTable />
          </div>
        </motion.div>
      </motion.div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;