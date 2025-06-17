import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';
import { toast } from 'sonner';
import { Plus, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Companies = () => {
    useGetAllCompanies();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [input, setInput] = useState("");
    const { companies } = useSelector(store => store.company);

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [dispatch, input]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                when: "beforeChildren"
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            <Navbar />
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="max-w-7xl mx-auto px-4 sm:px-6 py-8"
            >
                {/* Header Section */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Company Directory
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            {companies.length} {companies.length === 1 ? 'company' : 'companies'} registered
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className="relative w-full sm:w-64"
                        >
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Search companies..."
                                className="pl-10 w-full"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </motion.div>
                        
                        <motion.div 
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Button 
                                onClick={() => navigate('/admin/companies/create')}
                                className="gap-2 bg-[#638C2D] hover:bg-[#557A25]"
                            >
                                <Plus className="h-4 w-4" />
                                New Company
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Companies Table */}
                <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
                    <CompaniesTable />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Companies;