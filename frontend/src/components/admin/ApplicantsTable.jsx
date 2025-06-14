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
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="float-right cursor-pointer">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants && applicants.applications?.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item?.applicant?.fullname || "Name"}</TableCell>
                            <TableCell>{item?.applicant?.email || "Email"}</TableCell>
                            <TableCell>{item?.applicant?.phoneNumber || "Contact"}</TableCell>
                            <TableCell>
                                <a href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                    View Resume
                                </a>
                            </TableCell>
                            <TableCell>{new Date(item?.applicant?.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell className="float-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32 bg-white shadow-md p-2 rounded">
                                        {shortlistingStatus.map((status, index) => (
                                            <div key={index} className="flex w-fit items-center my-2 cursor-pointer hover:text-blue-500">
                                                <span>{status}</span>
                                            </div>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
        </div>
    );
};

export default ApplicantsTable;
