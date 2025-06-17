import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'
import { ArrowLeft, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Browse = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      return () => {
        dispatch(setSearchedQuery(""))
      }
    }, [])
    
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between mb-8">
                    <Button 
                        variant="ghost" 
                        className="gap-2 text-[#638C2D] hover:bg-[#638C2D]/10"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                    
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        Search Results <span className="text-[#638C2D]">({allJobs.length})</span>
                    </h1>
                    
                    <div className="w-20"></div> {/* Spacer for alignment */}
                </div>

                {searchedQuery && (
                    <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 text-gray-600 dark:text-gray-400"
                    >
                        Showing results for: <span className="font-medium text-[#638C2D]">"{searchedQuery}"</span>
                    </motion.p>
                )}

                {allJobs.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16 bg-white dark:bg-gray-900 rounded-xl shadow-sm"
                    >
                        <div className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-600 mb-4">
                            <Search className="w-full h-full" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            No jobs found
                        </h3>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">
                            {searchedQuery ? 'Try a different search term' : 'No jobs available at the moment'}
                        </p>
                        <Button 
                            variant="outline" 
                            className="mt-4"
                            onClick={() => navigate('/jobs')}
                        >
                            Browse all jobs
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div 
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <AnimatePresence>
                            {allJobs.map((job) => (
                                <motion.div
                                    key={job._id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Job job={job} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default Browse