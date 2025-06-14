import React from 'react';
import { useSelector } from 'react-redux';
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

const JobsTable = () => {
  const { companies } = useSelector((store) => store.company);

  return (
    <div>
      <Table>
        <TableCaption>A list of all jobs posted</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            companies?.length <= 0 ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <span>You haven't registered any company yet.</span>
                </TableCell>
              </TableRow>
            ) : (
              companies?.map((company) => (
                <TableRow key={company._id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={company.logo} />
                    </Avatar>
                  </TableCell>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                  <TableCell className="text-right cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
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
              ))
            )
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default JobsTable;




// import React from 'react';
// import { useSelector } from 'react-redux';
// import useGetAllJobs from '@/hooks/useGetAllJobs';
// import {
//   Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow
// } from '../ui/table';

// const JobsTable = () => {
//   useGetAllJobs();
//   const { companies } = useSelector((store) => store.company);
//   console.log(company);

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
//           {
//             companies.length <= 0 ? (
//               <span>You haven't registered any company yet.</span>
//             ) : (
//               companies?.map((company) => (
//                 <TableRow key={company._id}>
//                   <TableCell>
//                     <Avatar>
//                       <AvatarImage src="https://www.shutterstock.com/image-vector/circle" />
//                     </Avatar>
//                   </TableCell>
//                   <TableCell>Company Name</TableCell>
//                   <TableCell>18-07-2024</TableCell>
//                   <TableCell className="text-right cursor-pointer">
//                     <Popover>
//                       <PopoverTrigger>
//                         <MoreHorizontal />
//                       </PopoverTrigger>
//                       <PopoverContent className="w-32">
//                         <div className="flex items-center gap-2 w-fit cursor-pointer">
//                           <Edit2 className="w-4" />
//                           <span>Edit</span>
//                         </div>
//                       </PopoverContent>
//                     </Popover>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )
//           }
//         </TableBody>

//       </Table>
//     </div>
//   );
// };

// export default JobsTable;


