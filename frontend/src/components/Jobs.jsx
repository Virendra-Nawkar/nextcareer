import React, { useState } from 'react';
import FilterCard from './FilterCard';
import Job from './Job';
import Navbar from './shared/Navbar';
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { Funnel, Menu } from 'lucide-react';
import { Button } from './ui/button';

const Jobs = () => {
  useGetAllJobs();
  const { allJobs } = useSelector(store => store.job);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] transition-colors duration-300">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5 px-4">
        {/* Mobile filter toggle */}
        <div className="flex justify-between items-center sm:hidden mb-4">
          <h1 className="text-xl font-bold dark:text-gray-100">Available Jobs</h1>
          <Button variant="outline" onClick={() => setIsFilterOpen(true)}>
            <Funnel className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex gap-5">
          {/* Sidebar filter (hidden on mobile) */}
          <div className="w-[20%] hidden sm:block">
            <FilterCard />
          </div>

          {/* Drawer filter (mobile only) */}
          {isFilterOpen && (
            <>
              <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setIsFilterOpen(false)}></div>
              <div className="fixed top-0 left-0 w-4/5 h-full bg-white dark:bg-[#1E1E1E] z-50 shadow-lg p-4 overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold dark:text-gray-100">Filters</h2>
                  <Button variant="outline" size="sm" onClick={() => setIsFilterOpen(false)}>
                    Close
                  </Button>
                </div>
                <FilterCard />
              </div>
            </>
          )}

          {/* Main job content */}
          <main
            className={`flex-1 h-[88vh] overflow-y-auto pb-5 transition-all duration-300 ${
              isFilterOpen ? 'opacity-50 pointer-events-none select-none' : 'opacity-100'
            }`}
          >
            {allJobs.length <= 0 ? (
              <p className="text-center mt-10 text-gray-700 dark:text-gray-400">Job not found</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {allJobs.map((job) => (
                  <div key={job?._id}>
                    <Job job={job} />
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Jobs;





// import React from 'react';
// import FilterCard from './FilterCard';
// import Job from './Job';
// import Navbar from './shared/Navbar';
// import { useSelector } from 'react-redux';
// import useGetAllJobs from '@/hooks/useGetAllJobs';

// const Jobs = () => {
//     useGetAllJobs();
//     const {allJobs} = useSelector(store => store.job);
//     console.log("All Jobs from Redux:", allJobs);
//     return (
//         <div>
//             <Navbar />
//             <div className="max-w-7xl mx-auto mt-5">
//                 <div className="flex gap-5">
//                     <div className="w-[20%]">
//                         <FilterCard />
//                     </div>

//                     {allJobs.length <= 0 ? (
//                         <span>Job not found</span>
//                     ) : (
//                         <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
//                             <div className="grid grid-cols-3 gap-4">
//                                 {allJobs.map((job) => (
//                                     <div key={job?._id}>
//                                         <Job job={job} />
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Jobs;
