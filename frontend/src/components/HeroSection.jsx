import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '@/components/theme-provider'
import CategoryCarousel from './CategoryCarousel'

const HeroSection = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const { theme } = useTheme();
    
    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate('/browse')
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
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
        <section className="relative overflow-hidden">
            {/* Gradient background */}
            <div className={`absolute inset-0 -z-10 h-full w-full ${theme === 'dark' ? 'bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]' : 'bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]'}`}>
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#6A38C2] opacity-20 blur-[100px]"></div>
            </div>

            <motion.div 
                className="text-center py-20 px-4 sm:py-28 lg:py-32"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div variants={itemVariants}>
                    <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-[#6A38C2] dark:text-[#8A6FC5] font-medium inline-flex items-center gap-2'>
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6A38C2] dark:bg-[#8A6FC5] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6A38C2] dark:bg-[#8A6FC5]"></span>
                        </span>
                        Your next career move starts here
                    </span>
                </motion.div>

                <motion.h1 variants={itemVariants} className='text-4xl sm:text-5xl md:text-6xl font-bold mt-6 mb-4 leading-tight'>
                    Search, Apply & <br className="hidden sm:block" /> 
                    <span className="relative">
                        <span className="relative z-10">Get Your </span>
                        <span className="absolute bottom-2 left-0 w-full h-3 bg-[#6A38C2]/20 dark:bg-[#8A6FC5]/30 z-0"></span>
                    </span>
                    <span className='text-[#6A38C2] dark:text-[#8A6FC5]'>Dream Job</span>
                </motion.h1>

                <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 mb-8">
                    Discover thousands of job opportunities from top companies and take the next step in your career journey.
                </motion.p>

                <motion.div 
                    variants={itemVariants}
                    className="flex w-full max-w-2xl shadow-lg dark:shadow-gray-800/20 border border-gray-200 dark:border-gray-700 pl-3 pr-1 rounded-full items-center gap-2 mx-auto bg-white dark:bg-gray-900"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <input 
                        type="text"
                        placeholder='Find your Dream Job'
                        className='outline-none border-none w-full bg-transparent py-4 px-2 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500'
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && searchJobHandler()}
                    />
                    <Button 
                        className="rounded-r-full bg-gradient-to-r from-[#6A38C2] to-[#8A6FC5] hover:from-[#5A2DB0] hover:to-[#7A5FB5] h-12 w-12 sm:h-14 sm:w-14"
                        onClick={searchJobHandler}
                        size="icon"
                    >
                        <Search className="h-5 w-5" />
                    </Button>
                </motion.div>
                <CategoryCarousel/>
                {/* Popular searches */}
                {/* <motion.div 
                    variants={itemVariants}
                    className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-gray-400"
                >
                    <span>Popular: </span>
                    {['Developer', 'Designer', 'Marketing', 'Remote', 'Manager', 'Nagpur'].map((tag) => (
                        <button 
                            key={tag}
                            onClick={() => {
                                setQuery(tag);
                                dispatch(setSearchedQuery(tag));
                                navigate('/browse');
                            }}
                            className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                        >
                            {tag}
                        </button>
                    ))}
                </motion.div> */}
            </motion.div>
        </section>
    )
}

export default HeroSection