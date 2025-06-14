import React, { useEffect, useState } from 'react';
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
import { Edit2, MoreHorizontal, Trash, Trash2 } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

const JobsTable = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  //   useEffect(() => {
  //     const filteredCompany = companies.length >= 0 && companies.filter((company) => {
  //       if (!searchCompanyByText) {
  //         return true;
  //       }
  //       company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

  //     })
  // setFilterCompany(filteredCompany)
  //   }, [companies, searchCompanyByText])

  useEffect(() => {
    const filteredCompany = companies.length >= 0 && companies.filter((company) => {
      if (!searchCompanyByText) {
        return true;
      }
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);


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
              filterCompany?.map((company) => (
                <TableRow key={company._id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={company.logo} />
                    </Avatar>
                  </TableCell>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                  <TableCell className="text-right cursor-pointer flex gap-3 justify-end">
                    <Button variant="secondary" onClick={() => navigate(`/admin/companies/${company?._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </Button>
                    <Button variant="secondary" onClick={() => navigate(`/admin/companies/${company?._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                      <Trash2 className="w-4" />
                      <span>Delete</span>
                    </Button>
                    {/* <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-full flex gap-4">
                        <Button onClick={() => navigate(`/admin/companies/${company?._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                          <Edit2 className="w-4" />
                          <span>Edit</span>
                        </Button>
                         <Button onClick={() => navigate(`/admin/companies/${company?._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                          <Trash2 className="w-4" />
                          <span>Delete</span>
                        </Button>
                      </PopoverContent>
                    </Popover> */}
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
