import Navbar from '../shared/Navbar'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup } from "@/components/ui/radio-group"
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Login = () => {
    const [input, setinput] = useState({
        email: "",
        password: "",
        role: "",
    });

    const changeEventHandler = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(input);
    }


    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>

                    <div className='flex  flex-col gap-1 my-4'>
                        <Label>Email</Label>
                        <input className='pl-3' type="email"
                            placeholder="Enter your email"
                            name="email" value={input.email} onChange={changeEventHandler}
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
                    </div>
                    <Button type="submit" className="w-full my-4">Login</Button>
                    <span className='text-sm'>Don't have an Account ? <Link className='text-blue-600' to="/signup">Signup</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login
