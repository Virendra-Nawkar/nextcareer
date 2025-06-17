
import Navbar from '../shared/Navbar'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from "../../utils/constant.js"
import { useDispatch, useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react'
import { setLoading, setUser } from "../../redux/authSlice.js"

const Login = () => {
    const navigate = useNavigate()
    const [input, setinput] = useState({
        email: "",
        password: "",
        role: "student", // Set default role to student
    });

    const changeEventHandler = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value });
    }

    const dispatch = useDispatch();
    const { loading, user } = useSelector(store => store.auth);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user))
                localStorage.setItem("user", JSON.stringify(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log("Error in Submit Hanlder ", error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
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
                <div className="max-w-md mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-8 transition-all duration-300">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome Back</h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                Login to your {input.role === 'recruiter' ? 'recruiter' : 'job seeker'} account
                            </p>
                        </div>

                        <form onSubmit={submitHandler} className="space-y-6">
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

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    name="password"
                                    value={input.password}
                                    onChange={changeEventHandler}
                                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus-visible:ring-blue-500"
                                />
                            </div>

                            <div className="space-y-4">
                                <Label className="text-gray-700 dark:text-gray-300 block">
                                    I am a
                                </Label>
                                <RadioGroup
                                    defaultValue="student"
                                    className="grid grid-cols-2 gap-4"
                                    onValueChange={(value) => setinput({ ...input, role: value })}
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

                            <div className="pt-2">
                                {loading ? (
                                    <Button className="w-full" disabled>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Signing in...
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
                                        Login
                                    </Button>
                                )}
                            </div>

                            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 font-medium"
                                >
                                    Sign up
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login