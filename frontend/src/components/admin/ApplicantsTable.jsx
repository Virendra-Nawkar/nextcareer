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

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
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
                    <TableRow>
                        <TableCell>Full Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Contact</TableCell>
                        <TableCell>Resume</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell className="float-right cursor-pointer">
                            <Popover>
                                <PopoverTrigger>
                                    <MoreHorizontal />
                                </PopoverTrigger>
                                <PopoverContent className='w-32'>
                                    {shortlistingStatus.map((status, index) => {
                                        return (
                                            <div key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                <span>{status}</span>
                                            </div>
                                        );
                                    })}
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default ApplicantsTable;
