import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = allAdminJobs?.filter((job) => {
      if (!searchJobByText) return true;

      const titleMatch = job?.title?.toLowerCase().includes(searchJobByText.toLowerCase());
      const companyMatch = job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
      return titleMatch || companyMatch;
    });

    setFilterJobs(filtered);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div>
      <Table>
        <TableCaption>
          A list of your recently posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.length > 0 ? (
            filterJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job?.company?.name || 'NA'}</TableCell>
                <TableCell>{job?.title || 'Untitled'}</TableCell>
                <TableCell>{job?.createdAt?.split("T")[0] || 'Unknown'}</TableCell>
                <TableCell className="text-right flex justify-end gap-2">
                   <Button variant="secondary" onClick={() => navigate(`/admin/companies/${job?._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </Button>
                    <Button variant="secondary" onClick={() => navigate(`/admin/jobs/${job?._id}/applicants`)} className="flex items-center gap-2 w-fit cursor-pointer">
                      <Eye className="w-4" />
                      <span>Applicants</span>
                    </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No jobs found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;