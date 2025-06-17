import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const LatestJobs = () => {
  const { allJobs = [] } = useSelector((state) => state.job || {});
  const navigate = useNavigate();

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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-[#638C2D]/10 text-[#638C2D] mb-3">
              Career Opportunities
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              <span className="text-[#638C2D]">Latest & Top</span> Job Openings
            </h2>
          </div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="outline" 
              className="gap-2 border-[#638C2D] text-[#638C2D] hover:bg-[#638C2D]/10"
              onClick={() => navigate('/jobs')}
            >
              View all jobs
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>

        {allJobs.length <= 0 ? (
          <motion.div 
            variants={itemVariants}
            className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
          >
            <p className="text-lg text-gray-600 dark:text-gray-300">No jobs available at the moment</p>
            <Button 
              variant="ghost" 
              className="mt-4 text-[#638C2D] hover:bg-[#638C2D]/10"
              onClick={() => navigate('/jobs')}
            >
              Browse all jobs
            </Button>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {allJobs.slice(0, 6).map((job, index) => (
              <motion.div 
                key={job._id} 
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <LatestJobCards job={job} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default LatestJobs;