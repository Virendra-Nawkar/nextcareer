import React from 'react';
import Navbar from './shared/Navbar';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircleQuestion, LifeBuoy, Info, Users } from 'lucide-react';
import { Button } from './ui/button';

const supportTopics = [
  {
    icon: <MessageCircleQuestion className="text-[#638C2D] w-6 h-6" />,
    title: "General Queries",
    desc: "Got questions about using NextCareer? We’ve got you covered with easy how-tos and quick guides.",
  },
  {
    icon: <Users className="text-[#638C2D] w-6 h-6" />,
    title: "Account & Profile",
    desc: "Help with login, updating your profile, changing password, or deleting your account securely.",
  },
  {
    icon: <LifeBuoy className="text-[#638C2D] w-6 h-6" />,
    title: "Application Support",
    desc: "Having trouble applying for jobs or uploading your resume? We’re here to assist you.",
  },
  {
    icon: <Info className="text-[#638C2D] w-6 h-6" />,
    title: "Job Posting (For Employers)",
    desc: "Learn how to post jobs, view applicants, and manage your listings if you're a recruiter.",
  },
];

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100">
      <Navbar />
      <motion.div
        className="max-w-6xl mx-auto px-4 py-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold">Help Center</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Find answers, get support, and contact us directly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {supportTopics.map((topic, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex gap-4 items-start">
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md">{topic.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{topic.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{topic.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-2">Still need help?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Our support team is here for you — reach out anytime.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="outline" className="gap-2">
              <Mail className="h-4 w-4" />
              Email Support
            </Button>
            <Button variant="outline" className="gap-2">
              <Phone className="h-4 w-4" />
              +91 9876543210
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HelpCenter;
