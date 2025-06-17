import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2, Upload, Image } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'
import { motion } from 'framer-motion'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const { singleCompany } = useSelector(store => store.company);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState("");
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, file });
            setPreview(URL.createObjectURL(file));
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(
                    <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span>{res.data.message}</span>
                    </div>,
                    {
                        description: `${input.name} updated successfully`,
                        duration: 3000,
                    }
                );
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(
                <div className="flex items-center gap-2">
                    <span className="text-red-500">✗</span>
                    <span>{error?.response?.data?.message || "Update failed"}</span>
                </div>
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (singleCompany) {
            setInput({
                name: singleCompany.name || "",
                description: singleCompany.description || "",
                website: singleCompany.website || "",
                location: singleCompany.location || "",
                file: null
            });
            if (singleCompany.logo) {
                setPreview(singleCompany.logo);
            }
        }
    }, [singleCompany]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            <Navbar />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl mx-auto px-4 sm:px-6 py-8"
            >
                <form onSubmit={submitHandler} className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-4">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button 
                                onClick={() => navigate("/admin/companies")} 
                                variant="outline" 
                                className="gap-2 text-gray-700 dark:text-gray-300"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back
                            </Button>
                        </motion.div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Company Profile
                        </h1>
                    </div>

                    {/* Logo Upload */}
                    <div className="space-y-2">
                        <Label>Company Logo</Label>
                        <div className="flex items-center gap-6">
                            <div className="relative h-24 w-24 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center overflow-hidden">
                                {preview ? (
                                    <img 
                                        src={preview} 
                                        alt="Company logo preview" 
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center text-gray-400">
                                        <Image className="h-8 w-8" />
                                        <span className="text-xs mt-1">No logo</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <Label 
                                    htmlFor="file-upload"
                                    className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                    </div>
                                    <Input 
                                        id="file-upload" 
                                        type="file" 
                                        className="hidden" 
                                        accept="image/*"
                                        onChange={changeFileHandler}
                                    />
                                </Label>
                            </div>
                        </div>
                    </div>

                    {/* Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                placeholder="Enter company name"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Website</Label>
                            <Input
                                type="url"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                placeholder="https://example.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                placeholder="City, Country"
                                required
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                placeholder="Brief description about the company"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                        <Button 
                            type="submit" 
                            className="w-full mt-6 bg-[#638C2D] hover:bg-[#557A25]"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                "Update Company"
                            )}
                        </Button>
                    </motion.div>
                </form>
            </motion.div>
        </div>
    )
}

export default CompanySetup