import React from 'react';
import { Badge } from './ui/badge';
import { Briefcase, MapPin, DollarSign, Clock, IndianRupee } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';


const LatestJobCards = ({ job }) => {
  return (
    <div
      className="p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1f1f1f] shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
    >
      {/* Company Info */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-[#0077ff] transition-colors duration-200">
            {job?.company?.name}
          </h1>
          <div className="flex items-center mt-1 text-gray-600 dark:text-gray-400 text-sm">
            <MapPin className="h-4 w-4 mr-1 text-[#0077ff]" />
            <span>{job?.location}</span>
          </div>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          <Badge variant="outline">  
            {formatDistanceToNow(new Date(job?.createdAt), { addSuffix: true })}
          </Badge>
        </div>
      </div>

      {/* Job Details */}
      <div className="mt-5">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white group-hover:text-[#0077ff] transition-colors duration-200">
          {job?.title}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm line-clamp-2 leading-relaxed">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="mt-5 flex flex-wrap gap-3">
        <Badge
          variant="secondary"
          className="flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 dark:text-gray-200 hover:scale-105 transition-transform"
        >
          <Briefcase className="h-4 w-4 text-[#4B5563]" />
          {job?.position}
        </Badge>
        <Badge
          variant="secondary"
          className="flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 dark:text-gray-200 hover:scale-105 transition-transform"
        >
          <Clock className="h-4 w-4 text-[#4B5563]" />
          {job?.jobType}
        </Badge>
        <Badge
          variant="secondary"
          className="flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 dark:text-gray-200 hover:scale-105 transition-transform"
        >
          <IndianRupee className="h-4 w-4 text-[#4B5563]" />
          {job?.salary} LPA
        </Badge>
        {job?.isRemote && (
          <Badge
            variant="secondary"
            className="px-3 py-1 rounded-full text-sm bg-green-100 dark:bg-green-900 dark:text-green-300 hover:scale-105 transition-transform"
          >
            Remote
          </Badge>
        )}
      </div>

      {/* Action Button */}
      <button
        className="mt-6 w-full py-2 px-4 bg-[#0077ff] hover:bg-[#005ecb] dark:bg-[#2563eb] dark:hover:bg-[#1d4ed8] text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-xl"
      >
        Apply Now
      </button>
    </div>
  );
};

export default LatestJobCards;



// import React from 'react';
// import { Badge } from './ui/badge';

// const LatestJobCards = ({ job }) => {
//   return (
//     <div className="p-4 border rounded-md shadow-xl border-gray-100">
//       <div>
//         <h1 className="text-xl font-semibold">{job?.company?.name}</h1>
//         <p>{job?.location}</p>
//       </div>
//       <div className="mt-2">
//         <h1 className="text-lg font-medium">{job?.title}</h1>
//         <p>{job?.description}</p>
//       </div>
//       <div className="mt-2 flex gap-2 flex-wrap items-center">
//         <Badge className="text-blue-700 font-bold" variant="ghost">{job?.position}</Badge>
//         <Badge className="text-[#F38002] font-bold" variant="ghost">{job?.jobType}</Badge>
//         <Badge className="text-[#7209B7] font-bold" variant="ghost">{job?.salary + " LPA"}</Badge>
//       </div>
//     </div>
//   );
// };

// export default LatestJobCards;
