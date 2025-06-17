import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from "sonner"
import { USER_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from "../../redux/authSlice.js"
import { Loader2 } from 'lucide-react'

const Signup = () => {
    const [input, setinput] = useState({
        fullname: "",
        email: "",
        phoneNumer: "",
        password: "",
        role: "student",
        file: "",
    });

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { loading, user } = useSelector(store => store.auth);

    const changeEventHandler = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value });
    }
    
    const changeFileHandler = (e) => {
        setinput({ ...input, file: e.target.files?.[0] });
    }
    
    const submitHandler = async (e) => {
        dispatch(setLoading(true))
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            });

            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log("Error in Submit Hanlder ", error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false))
        }
    }

    useEffect(() => {
            if (user) {
                toast.info("You are already logged in!");
                navigate("/");
            }
        }, [user, navigate]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Navbar />
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-8 transition-all duration-300">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Create Your Account</h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Join our platform to {input.role === 'recruiter' ? 'find the best talent' : 'discover your dream job'}
                            </p>
                        </div>

                        <form onSubmit={submitHandler} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="fullname" className="text-gray-700 dark:text-gray-300">
                                        Full Name
                                    </Label>
                                    <Input
                                        id="fullname"
                                        type="text"
                                        placeholder="Enter your full name"
                                        name="fullname"
                                        value={input.fullname}
                                        onChange={changeEventHandler}
                                        className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus-visible:ring-blue-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                                        Email Address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        name="email"
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus-visible:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="phoneNumber" className="text-gray-700 dark:text-gray-300">
                                        Phone Number
                                    </Label>
                                    <Input
                                        id="phoneNumber"
                                        type="text"
                                        placeholder="Enter your phone number"
                                        name="phoneNumber"
                                        value={input.phoneNumber}
                                        onChange={changeEventHandler}
                                        className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus-visible:ring-blue-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                                        Password
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Create a password"
                                        name="password"
                                        value={input.password}
                                        onChange={changeEventHandler}
                                        className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus-visible:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Label className="text-gray-700 dark:text-gray-300 block">
                                    I am a
                                </Label>
                                <RadioGroup 
                                    defaultValue="student" 
                                    className="grid grid-cols-2 gap-4"
                                    onValueChange={(value) => setinput({...input, role: value})}
                                >
                                    <div>
                                        <RadioGroupItem
                                            value="student"
                                            id="student"
                                            className="peer sr-only"
                                        />
                                        <Label
                                            htmlFor="student"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-600 hover:cursor-pointer peer-data-[state=checked]:border-blue-500 dark:peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 dark:peer-data-[state=checked]:bg-blue-900/20"
                                        >
                                            <span className="text-gray-700 dark:text-gray-300">Job Seeker</span>
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem
                                            value="recruiter"
                                            id="recruiter"
                                            className="peer sr-only"
                                        />
                                        <Label
                                            htmlFor="recruiter"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-600 hover:cursor-pointer peer-data-[state=checked]:border-blue-500 dark:peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 dark:peer-data-[state=checked]:bg-blue-900/20"
                                        >
                                            <span className="text-gray-700 dark:text-gray-300">Recruiter</span>
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="profile" className="text-gray-700 dark:text-gray-300">
                                    Profile Picture
                                </Label>
                                <div className="flex items-center gap-4">
                                    <Input
                                        id="profile"
                                        type="file"
                                        accept="image/*"
                                        onChange={changeFileHandler}
                                        className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/20 dark:file:text-blue-300 dark:hover:file:bg-blue-900/30"
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                {loading ? (
                                    <Button className="w-full" disabled>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating account...
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
                                        Sign Up
                                    </Button>
                                )}
                            </div>

                            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 font-medium"
                                >
                                    Log in
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup


// import React, { useState } from 'react'
// import Navbar from '../shared/Navbar'
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { RadioGroup, RadioGroupItem, } from "@/components/ui/radio-group"
// import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { toast } from "sonner"
// import { USER_API_END_POINT } from "../../utils/constant";
// import { useDispatch, useSelector } from 'react-redux'
// import { setLoading } from "../../redux/authSlice.js"
 



// const Signup = () => {
//     const [input, setinput] = useState({
//         fullname: "",
//         email: "",
//         phoneNumer: "",
//         password: "",
//         role: "",
//         file: "",
//     });

//     const navigate = useNavigate()
//     const dispatch = useDispatch();
//     const { loading } = useSelector(store => store.auth);


//     const changeEventHandler = (e) => {
//         setinput({ ...input, [e.target.name]: e.target.value });
//     }
//     const changeFileHandler = (e) => {
//         setinput({ ...input, file: e.target.files?.[0] });
//     }
//     const submitHandler = async (e) => {
//         dispatch(setLoading(true))
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append("fullname", input.fullname);
//         formData.append("email", input.email);
//         formData.append("phoneNumber", input.phoneNumber);
//         formData.append("password", input.password);
//         formData.append("role", input.role);
//         if (input.file) {
//             formData.append("file", input.file);
//         }
//         try {
//             const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data"
//                 },
//                 withCredentials: true,
//             });

//             if (res.data.success) {
//                 navigate("/login");
//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             console.log("Error in Submit Hanlder ", error);
//             toast.error(error.response.data.message);
//         } finally {
//             dispatch(setLoading(false))
//         }
//     }

//     return (
//         <div>
//             <Navbar />
//             <div className='flex items-center justify-center max-w-7xl mx-auto'>
//                 <form onSubmit={submitHandler} action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
//                     <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
//                     <div className='flex  flex-col gap-1 my-4'>
//                         <Label>Full Name</Label>
//                         <input className='pl-3' type="text"
//                             placeholder="Enter your full name"
//                             name="fullname" value={input.fullname} onChange={changeEventHandler}
//                         />
//                     </div>

//                     <div className='flex  flex-col gap-1 my-4'>
//                         <Label>Email</Label>
//                         <input className='pl-3' type="email"
//                             placeholder="Enter your email"
//                             name="email" value={input.email} onChange={changeEventHandler}
//                         />
//                     </div>

//                     <div className='flex  flex-col gap-1 my-4'>
//                         <Label>Phone Number</Label>
//                         <input className='pl-3'
//                             placeholder="Enter your Phone Number" type='text'
//                             name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler}

//                         />
//                     </div>

//                     <div className='flex  flex-col gap-1 my-4'>
//                         <Label>Password</Label>
//                         <input className='pl-3'
//                             type='password'
//                             placeholder="Enter your Password"
//                             name="password" value={input.password} onChange={changeEventHandler}
//                         />
//                     </div>
//                     <div className='flex items-center justify-between'>
//                         <RadioGroup className="flex items-center gap-4 my-5" defaultValue="student">
//                             <div className="flex items-center gap-3">
//                                 <Input type="radio" name="role" value="student" className="cursor-pointer"
//                                     checked={input.role === 'student'} onChange={changeEventHandler}
//                                 />
//                                 <Label htmlFor="r1">Student</Label>
//                             </div>
//                             <div className="flex items-center gap-3">
//                                 <Input type="radio" name="role" value="recruiter" className="cursor-pointer"
//                                     checked={input.role === 'recruiter'} onChange={changeEventHandler}
//                                 />
//                                 <Label htmlFor="r2">Recruiter</Label>
//                             </div>
//                         </RadioGroup>
//                         <div className='flex items-center gap-2'>
//                             <Label>Profile</Label>
//                             <Input accept="image/*" type="file" className="cursor-pointer"
//                                 onChange={changeFileHandler}
//                             />
//                         </div>

//                     </div>
//                     {
//                         loading ?
//                             <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button>
//                             : <Button type="submit" className="w-full my-4">Login</Button>
//                     }
//                     <span className='text-sm'>Already have an Account ? <Link className='text-blue-600' to="/login">SignUp</Link></span>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Signup
