import React from 'react'
import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Navbar from './shared/Navbar'
import { Button } from './ui/button'

const tips = [
  "Keep it concise – ideally one page for freshers.",
  "Use a professional format with clear sections.",
  "Highlight key skills relevant to the job you're applying for.",
  "Quantify achievements (e.g., “Improved performance by 30%”).",
  "Use action words like 'led', 'built', 'managed', etc.",
  "Tailor your resume for each job role.",
  "Include links to your GitHub, LinkedIn, or portfolio.",
  "Proofread to avoid typos and grammatical errors.",
]

const ResumeTips = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 transition-colors">
      <Navbar/>

      <motion.div
        className="max-w-5xl mx-auto px-4 py-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Resume Building Tips</h1>
          <p className="text-gray-600 dark:text-gray-400">Craft a resume that lands interviews and gets noticed</p>
        </div>

        {/* Tips */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 mb-10 border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold mb-4">Top Tips for a Great Resume</h2>
          <ul className="list-disc list-inside space-y-2">
            {tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

        {/* Example CTA */}
        <div className="text-center mb-12">
          <h3 className="text-lg font-semibold mb-2">Need help creating a resume?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Use our profile section to upload or update your resume.
          </p>
          <Button onClick={() => navigate('/profile')} className="mx-auto gap-2">
            <FileText className="w-4 h-4" />
            Go to Profile
          </Button>
        </div>

        {/* Footer Note */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-600">
          © {new Date().getFullYear()} NextCareer. Empowering your career growth.
        </div>
      </motion.div>
    </div>
  )
}

export default ResumeTips
