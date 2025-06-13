
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';

const CompaniesTable = () => {

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>
              <Avatar>
                <AvatarImage src="/CompnayLogo.png"  />
              </Avatar>
            </TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>18-07-2024</TableCell>
            <TableCell className="text-right">
              <Popover>
                <PopoverTrigger asChild>
                  <MoreHorizontal className="cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent className="w-32">
                  <div className="flex items-center gap-2 w-fit cursor-pointer">
                    <Edit2 className="w-4" />
                    <span>Edit</span>
                  </div>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;



// import React from 'react';
// import { useSelector } from 'react-redux';
// import useGetAllJobs from '@/hooks/useGetAllJobs';
// import {
//   Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow
// } from '../ui/table';

// const JobsTable = () => {
//   useGetAllJobs();
//   const { allJobs } = useSelector((store) => store.job);

//   return (
//     <div>
//       <Table>
//         <TableCaption>A list of all jobs posted</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Title</TableHead>
//             <TableHead>Company</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {allJobs && allJobs.length > 0 ? (
//             allJobs.map((job) => (
//               <TableRow key={job._id}>
//                 <TableCell>{job.title}</TableCell>
//                 <TableCell>{job.company?.name || 'N/A'}</TableCell>
//                 <TableCell>{new Date(job.createdAt).toLocaleDateString()}</TableCell>
//                 <TableCell className="text-right">
//                   {/* Add Edit/Delete/Details here */}
//                 </TableCell>
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={4} className="text-center">No jobs found</TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default JobsTable;


