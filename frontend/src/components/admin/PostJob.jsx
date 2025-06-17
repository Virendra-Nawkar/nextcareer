import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Loader2, Plus, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PostJob = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { companies } = useSelector(store => store.company);

    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experienceLevel: "",
        position: 0,
        companyId: ""
    });

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find(company => company.name.toLowerCase() === value);
        if (selectedCompany) {
            setInput(prev => ({ ...prev, companyId: selectedCompany._id }));
        }
    };

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: name === "position" ? Number(value) : value
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!input.companyId) {
            toast.error("Please select a company.");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(
                `${JOB_API_END_POINT}/post`,
                input,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );

            if (res.data.success) {
                toast.success(
                    <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span>{res.data.message}</span>
                    </div>,
                    {
                        description: `${input.title} created successfully`,
                        duration: 3000,
                    }
                );
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.error(error);
            toast.error(
                <div className="flex items-center gap-2">
                    <span className="text-red-500">✗</span>
                    <span>{error?.response?.data?.message || "Something went wrong"}</span>
                </div>
            );
        } finally {
            setLoading(false);
        }
    };

    const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Temporary"];
    const experienceLevels = ["Entry Level", "Mid Level", "Senior", "Executive"];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            <Navbar />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto px-4 sm:px-6 py-8"
            >
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="mb-6"
                >
                    <Button 
                        onClick={() => navigate(-1)} 
                        variant="outline" 
                        className="gap-2 text-gray-700 dark:text-gray-300"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6"
                >
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Post New Job
                    </h1>

                    <form onSubmit={submitHandler} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Job Title */}
                            <div className="space-y-2">
                                <Label>Job Title *</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    value={input.title}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. Senior Frontend Developer"
                                    required
                                />
                            </div>

                            {/* Company Select */}
                            <div className="space-y-2">
                                <Label>Company *</Label>
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companies.length > 0 ? (
                                                companies.map(company => (
                                                    <SelectItem 
                                                        key={company._id} 
                                                        value={company.name.toLowerCase()}
                                                    >
                                                        {company.name}
                                                    </SelectItem>
                                                ))
                                            ) : (
                                                <div className="px-2 py-1.5 text-sm text-gray-500">
                                                    No companies available
                                                </div>
                                            )}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {companies.length === 0 && (
                                    <p className="text-xs text-red-600 dark:text-red-400">
                                        Please register a company first
                                    </p>
                                )}
                            </div>

                            {/* Location */}
                            <div className="space-y-2">
                                <Label>Location *</Label>
                                <Input
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. Remote, New York, etc."
                                    required
                                />
                            </div>

                            {/* Salary */}
                            <div className="space-y-2">
                                <Label>Salary *</Label>
                                <Input
                                    type="text"
                                    name="salary"
                                    value={input.salary}
                                    onChange={changeEventHandler}
                                    placeholder="e.g. $90,000 - $120,000"
                                    required
                                />
                            </div>

                            {/* Job Type */}
                            <div className="space-y-2">
                                <Label>Job Type *</Label>
                                <Select 
                                    onValueChange={(value) => setInput(prev => ({ ...prev, jobType: value }))}
                                    value={input.jobType}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select job type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {jobTypes.map(type => (
                                                <SelectItem key={type} value={type}>
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Experience Level */}
                            <div className="space-y-2">
                                <Label>Experience Level *</Label>
                                <Select 
                                    onValueChange={(value) => setInput(prev => ({ ...prev, experienceLevel: value }))}
                                    value={input.experienceLevel}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select experience level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {experienceLevels.map(level => (
                                                <SelectItem key={level} value={level}>
                                                    {level}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Positions */}
                            <div className="space-y-2">
                                <Label>Number of Positions *</Label>
                                <Input
                                    type="number"
                                    name="position"
                                    value={input.position}
                                    onChange={changeEventHandler}
                                    min="1"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2 space-y-2">
                                <Label>Description *</Label>
                                <Input
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    placeholder="Detailed job description"
                                    required
                                />
                            </div>

                            {/* Requirements */}
                            <div className="md:col-span-2 space-y-2">
                                <Label>Requirements *</Label>
                                <Input
                                    type="text"
                                    name="requirements"
                                    value={input.requirements}
                                    onChange={changeEventHandler}
                                    placeholder="Required skills and qualifications"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.div 
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="pt-4"
                        >
                            <Button 
                                type="submit" 
                                className="w-full gap-2 bg-[#638C2D] hover:bg-[#557A25]"
                                disabled={loading || companies.length === 0}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Posting Job...
                                    </>
                                ) : (
                                    <>
                                        <Plus className="h-4 w-4" />
                                        Post Job
                                    </>
                                )}
                            </Button>
                        </motion.div>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default PostJob;