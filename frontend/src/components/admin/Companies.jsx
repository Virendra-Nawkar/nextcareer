import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';
import { toast } from 'sonner'; // ✅ Make sure toast is from 'sonner'

const Companies = () => {
    useGetAllCompanies();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState("");

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [dispatch, input]);

    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto my-10">
                <div className="flex items-center justify-between my-5">
                    <Input
                        className="w-fit"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate('/admin/companies/create')}>
                        New Company
                    </Button>
                </div>

                <CompaniesTable />

                {/* ✅ Example toast trigger */}
                <Button
                    onClick={() => toast.success("🎉 You are seeing rich color toast!")}
                    className="mt-4"
                >
                    Show Toast
                </Button>
            </div>
        </div>
    );
};

export default Companies;
