import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import { Briefcase, MapPin, Clock, DollarSign, User, Calendar, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const [isApplied, setIsApplied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { id: jobId } = useParams();
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        setIsApplied(true);
        toast.success(
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span>
            <span>{res.data.message}</span>
          </div>,
          {
            description: `Application submitted for ${singleJob?.title}`,
            duration: 3000,
          }
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        <div className="flex items-center gap-2">
          <span className="text-red-500">✗</span>
          <span>{error.response?.data?.message || "Something went wrong"}</span>
        </div>
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.isApplied);
        }
      } catch (error) {
        console.log("Error fetching job", error);
      }
    };

    if (jobId) fetchSingleJob();
  }, [jobId, dispatch]);

  if (!singleJob) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto my-10 flex justify-center">
          <div className="animate-pulse">Loading job details...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 py-8"
      >
        {/* Job Header */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <motion.h1 
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
              >
                {singleJob.title}
              </motion.h1>
              
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <Badge className="bg-[#638C2D]/10 text-[#638C2D] hover:bg-[#638C2D]/20">
                  {singleJob.position} Position{singleJob.position !== 1 ? 's' : ''}
                </Badge>
                <Badge className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200">
                  {singleJob.jobType}
                </Badge>
                <Badge className="bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200">
                  ₹{singleJob.salary} LPA
                </Badge>
                {singleJob.isRemote && (
                  <Badge className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200">
                    Remote
                  </Badge>
                )}
              </div>
            </div>

            <motion.div
              whileHover={!isApplied ? { scale: 1.03 } : {}}
              whileTap={!isApplied ? { scale: 0.97 } : {}}
            >
              <Button
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied || isLoading}
                size="lg"
                className={`gap-2 ${isApplied 
                  ? 'bg-gray-500 dark:bg-gray-600 cursor-not-allowed' 
                  : 'bg-[#638C2D] hover:bg-[#557A25]'}`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Applying...
                  </>
                ) : isApplied ? (
                  <>
                    <span className="text-green-300">✓</span>
                    Applied
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4" />
                    Apply Now
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Description */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">
                Job Description
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {singleJob.description}
              </p>
            </motion.div>

            {/* Requirements */}
            {singleJob.requirements && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">
                  Requirements
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {singleJob.requirements}
                </p>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">
                Job Overview
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Briefcase className="h-5 w-5 text-[#638C2D] mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-500 dark:text-gray-400">Position</h3>
                    <p className="text-gray-900 dark:text-white">{singleJob.title}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-[#638C2D] mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-500 dark:text-gray-400">Location</h3>
                    <p className="text-gray-900 dark:text-white">{singleJob.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 text-[#638C2D] mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-500 dark:text-gray-400">Job Type</h3>
                    <p className="text-gray-900 dark:text-white">{singleJob.jobType}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <DollarSign className="h-5 w-5 text-[#638C2D] mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-500 dark:text-gray-400">Salary</h3>
                    <p className="text-gray-900 dark:text-white">₹{singleJob.salary} LPA</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <User className="h-5 w-5 text-[#638C2D] mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-500 dark:text-gray-400">Experience</h3>
                    <p className="text-gray-900 dark:text-white">{singleJob.experienceLevel} years</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Calendar className="h-5 w-5 text-[#638C2D] mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-500 dark:text-gray-400">Posted Date</h3>
                    <p className="text-gray-900 dark:text-white">
                      {format(new Date(singleJob.createdAt), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <User className="h-5 w-5 text-[#638C2D] mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-500 dark:text-gray-400">Applicants</h3>
                    <p className="text-gray-900 dark:text-white">
                      {singleJob.applications?.length || 0} applicant{singleJob.applications?.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Company Info */}
            {singleJob.company && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-800">
                  About the Company
                </h2>
                <div className="flex items-center gap-4 mb-4">
                  {singleJob.company.logo && (
                    <img 
                      src={singleJob.company.logo} 
                      alt={singleJob.company.name} 
                      className="h-12 w-12 rounded-lg object-contain border border-gray-200 dark:border-gray-700"
                    />
                  )}
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{singleJob.company.name}</h3>
                    {singleJob.company.website && (
                      <a 
                        href={singleJob.company.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[#638C2D] hover:underline text-sm"
                      >
                        Visit website
                      </a>
                    )}
                  </div>
                </div>
                {singleJob.company.description && (
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {singleJob.company.description}
                  </p>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default JobDescription;