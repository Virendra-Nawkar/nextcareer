import React from 'react'
import Navbar from './shared/Navbar'
import { motion } from 'framer-motion'
import { BookOpen, Compass, Lightbulb, TrendingUp } from 'lucide-react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const tips = [
  {
    icon: <Compass className="h-6 w-6 text-[#638C2D]" />,
    title: "Explore Your Interests",
    desc: "Take time to understand what kind of roles, industries, and work environments excite you. Don’t rush—career growth is a journey."
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-[#638C2D]" />,
    title: "Build In-Demand Skills",
    desc: "Keep learning. Strengthen your technical and soft skills through online courses, open-source contributions, and real projects."
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-[#638C2D]" />,
    title: "Network Smartly",
    desc: "Connect with professionals on LinkedIn, attend career fairs, and join relevant communities. Networking opens hidden job opportunities."
  },
  {
    icon: <BookOpen className="h-6 w-6 text-[#638C2D]" />,
    title: "Stay Updated",
    desc: "The tech world evolves quickly. Follow tech blogs, newsletters, and GitHub trends to remain current and relevant in your field."
  }
]

const CareerAdvice = () => {
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
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Career Advice</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Expert insights to help you build a strong and fulfilling career
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
                  {tip.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{tip.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{tip.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Want to explore job opportunities?</p>
          <Button onClick={() => navigate('/jobs')} className="bg-[#638C2D] hover:bg-[#557A25]">
            Browse Jobs
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default CareerAdvice;
