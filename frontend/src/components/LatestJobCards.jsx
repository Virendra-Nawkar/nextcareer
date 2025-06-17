import React from 'react';
import { Badge } from './ui/badge';
import { Briefcase, MapPin, Clock, IndianRupee, ArrowRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      onClick={() => navigate(`description/${job._id}`)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -5,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer h-full flex flex-col"
    >
      {/* Company Info */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
              {job?.company?.logo ? (
                <img 
                  src={job.company.logo} 
                  alt={job?.company?.name} 
                  className="w-full h-full object-contain p-1"
                />
              ) : (
                <span className="text-xl font-bold text-gray-500 dark:text-gray-400">
                  {job?.company?.name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-[#638C2D] transition-colors duration-200">
                {job?.company?.name}
              </h1>
              <div className="flex items-center mt-1 text-gray-600 dark:text-gray-400 text-sm">
                <MapPin className="h-4 w-4 mr-1 text-[#638C2D]" />
                <span>{job?.location}</span>
              </div>
            </div>
          </div>
        </div>
        <Badge variant="outline" className="text-xs text-gray-500 dark:text-gray-400">
          {formatDistanceToNow(new Date(job?.createdAt), { addSuffix: true })}
        </Badge>
      </div>

      {/* Job Details */}
      <div className="mt-5 flex-grow">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-[#638C2D] transition-colors duration-200">
          {job?.title}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="mt-5 flex flex-wrap gap-2">
        <Badge
          variant="secondary"
          className="flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
        >
          <Briefcase className="h-3 w-3 text-gray-500 dark:text-gray-400" />
          {job?.position}
        </Badge>
        <Badge
          variant="secondary"
          className="flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
        >
          <Clock className="h-3 w-3 text-gray-500 dark:text-gray-400" />
          {job?.jobType}
        </Badge>
        <Badge
          variant="secondary"
          className="flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
        >
          <IndianRupee className="h-3 w-3 text-gray-500 dark:text-gray-400" />
          {job?.salary} LPA
        </Badge>
        {job?.isRemote && (
          <Badge
            className="px-3 py-1 rounded-full text-xs bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800 transition-all"
          >
            Remote
          </Badge>
        )}
      </div>

      {/* Action Button */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-6"
      >
        <button
          className="w-full py-2 px-4 bg-gradient-to-r from-[#638C2D] to-[#8BAF50] hover:from-[#557A25] hover:to-[#7A9F45] text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          Apply Now
          <ArrowRight className="h-4 w-4" />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default LatestJobCards;