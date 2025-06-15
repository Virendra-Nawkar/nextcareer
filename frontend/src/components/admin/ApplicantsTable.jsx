import React from 'react';
import {
    Table, TableBody, TableCaption, TableCell,
    TableHead, TableHeader, TableRow
} from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = (status, id) => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
    try {
        axios.defaults.withCredentials = true;
        const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
        if (res.data.success) {
            toast.success(res.data.message);
        }
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
    }
} 
    return ( 
        <div>
            <Table>
                <TableCaption>
                    A list of your recent applied user
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants?.applications?.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item?.applicant?.fullname || "Name"}</TableCell>
                            <TableCell>{item?.applicant?.email || "Email"}</TableCell>
                            <TableCell>{item?.applicant?.phoneNumber || "Contact"}</TableCell>
                            <TableCell>
                                {
                                    item?.applicant?.profile?.resume
                                        ? <a href={item.applicant.profile.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Resume</a>
                                        : "Resume not Uploaded"
                                }
                            </TableCell>
                            <TableCell>{new Date(item?.applicant?.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32 bg-white shadow-md p-2 rounded">
                                        {shortlistingStatus.map((status, index) => (
                                            <div onClick={() => statusHandler(status, item?._id)} key={index} className="flex items-center my-2 cursor-pointer hover:text-blue-500">
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
