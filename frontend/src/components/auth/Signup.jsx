import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem, } from "@/components/ui/radio-group"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from "sonner"
import { USER_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from "../../redux/authSlice.js"
 



const Signup = () => {
    const [input, setinput] = useState({
        fullname: "",
        email: "",
        phoneNumer: "",
        password: "",
        role: "",
        file: "",
    });

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { loading } = useSelector(store => store.auth);


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

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div className='flex  flex-col gap-1 my-4'>
                        <Label>Full Name</Label>
                        <input className='pl-3' type="text"
                            placeholder="Enter your full name"
                            name="fullname" value={input.fullname} onChange={changeEventHandler}
                        />
                    </div>

                    <div className='flex  flex-col gap-1 my-4'>
                        <Label>Email</Label>
                        <input className='pl-3' type="email"
                            placeholder="Enter your email"
                            name="email" value={input.email} onChange={changeEventHandler}
                        />
                    </div>

                    <div className='flex  flex-col gap-1 my-4'>
                        <Label>Phone Number</Label>
                        <input className='pl-3'
                            placeholder="Enter your Phone Number" type='text'
                            name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler}

                        />
                    </div>

                    <div className='flex  flex-col gap-1 my-4'>
                        <Label>Password</Label>
                        <input className='pl-3'
                            type='password'
                            placeholder="Enter your Password"
                            name="password" value={input.password} onChange={changeEventHandler}
                        />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className="flex items-center gap-4 my-5" defaultValue="student">
                            <div className="flex items-center gap-3">
                                <Input type="radio" name="role" value="student" className="cursor-pointer"
                                    checked={input.role === 'student'} onChange={changeEventHandler}
                                />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center gap-3">
                                <Input type="radio" name="role" value="recruiter" className="cursor-pointer"
                                    checked={input.role === 'recruiter'} onChange={changeEventHandler}
                                />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input accept="image/*" type="file" className="cursor-pointer"
                                onChange={changeFileHandler}
                            />
                        </div>

                    </div>
                    {
                        loading ?
                            <Button className="w-full my-4"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button>
                            : <Button type="submit" className="w-full my-4">Login</Button>
                    }
                    <span className='text-sm'>Already have an Account ? <Link className='text-blue-600' to="/login">SignUp</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup
