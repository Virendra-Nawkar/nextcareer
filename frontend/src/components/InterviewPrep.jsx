import React from 'react'
import Navbar from './shared/Navbar'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Brain, Mic, FileText, UserCheck } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const sections = [
  {
    icon: <Brain className="h-6 w-6 text-[#638C2D]" />,
    title: "Understand the Basics",
    desc: "Make sure you have a strong grasp on data structures, algorithms, OOPs, DBMS, OS, and networking. These are core subjects for tech interviews."
  },
  {
    icon: <FileText className="h-6 w-6 text-[#638C2D]" />,
    title: "Study Common Questions",
    desc: "Practice questions on LeetCode, HackerRank, and Coding Ninjas. Focus on patterns like sliding window, two pointers, recursion, backtracking."
  },
  {
    icon: <Mic className="h-6 w-6 text-[#638C2D]" />,
    title: "Mock Interviews",
    desc: "Conduct mock interviews with friends or use platforms like Pramp or Interviewing.io to simulate real scenarios and build confidence."
  },
  {
    icon: <UserCheck className="h-6 w-6 text-[#638C2D]" />,
    title: "Behavioral Rounds",
    desc: "Prepare for HR questions like 'Tell me about yourself', 'Why should we hire you?', 'Strengths and weaknesses', etc. Be honest and structured."
  }
]

const InterviewPrep = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <Navbar />

      <motion.div
        className="max-w-5xl mx-auto px-4 py-10 text-gray-800 dark:text-gray-100"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Interview Preparation Guide</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Be interview-ready with these curated tips and resources
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((item, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Ready to apply your skills?</p>
          <Button onClick={() => navigate('/jobs')} className="bg-[#638C2D] hover:bg-[#557A25]">
            View Open Jobs
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default InterviewPrep;
