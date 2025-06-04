import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User2, Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const { user } = useSelector(store => store.auth)
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

    return (
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Next<span className="text-[#F83002] dark:text-[#FF5C35]">Career</span>
                            </h1>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <nav className="flex items-center space-x-6">
                            <Link
                                to="/"
                                className="text-gray-700 dark:text-gray-300 hover:text-[#F83002] dark:hover:text-[#FF5C35] transition-colors font-medium"
                            >
                                Home
                            </Link>
                            <Link
                                to="/jobs"
                                className="text-gray-700 dark:text-gray-300 hover:text-[#F83002] dark:hover:text-[#FF5C35] transition-colors font-medium"
                            >
                                Jobs
                            </Link>
                            <Link
                                to="/browse"
                                className="text-gray-700 dark:text-gray-300 hover:text-[#F83002] dark:hover:text-[#FF5C35] transition-colors font-medium"
                            >
                                Browse
                            </Link>
                        </nav>

                        {!user ? (
                            <div className="flex items-center space-x-3 ml-4">
                                <Link to="/login">
                                    <Button variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-[#6A38C2] hover:bg-[#7b5fac] dark:bg-[#7B5FAC] dark:hover:bg-[#8A6FC5] text-white">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer h-9 w-9 border-2 border-transparent hover:border-[#6A38C2] dark:hover:border-[#7B5FAC] transition-all">
                                        <AvatarImage src="/Account.png" alt="User avatar" />
                                        <AvatarFallback className="bg-gray-100 dark:bg-gray-700">
                                            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-64 p-4 mt-2 shadow-lg rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-3">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src="/Account.png" alt="User avatar" />
                                                <AvatarFallback className="bg-gray-100 dark:bg-gray-700">
                                                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h4 className="font-medium text-gray-900 dark:text-white">
                                                    {user.name || "User"}
                                                </h4>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {user.email || "Member"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Link to="/profile">
                                                <Button
                                                    variant="ghost"
                                                    className="w-full justify-start space-x-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                >
                                                    <User2 className="h-4 w-4" />
                                                    <span>View Profile</span>
                                                </Button>
                                            </Link>

                                            <Button
                                                variant="ghost"
                                                className="w-full justify-start space-x-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                <span>Logout</span>
                                            </Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-gray-700 dark:text-gray-300"
                        >
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden pb-4 space-y-4">
                        <nav className="flex flex-col space-y-3">
                            <Link
                                to="/"
                                className="text-gray-700 dark:text-gray-300 hover:text-[#F83002] dark:hover:text-[#FF5C35] transition-colors font-medium"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                to="/jobs"
                                className="text-gray-700 dark:text-gray-300 hover:text-[#F83002] dark:hover:text-[#FF5C35] transition-colors font-medium"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Jobs
                            </Link>
                            <Link
                                to="/browse"
                                className="text-gray-700 dark:text-gray-300 hover:text-[#F83002] dark:hover:text-[#FF5C35] transition-colors font-medium"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Browse
                            </Link>
                        </nav>

                        {!user ? (
                            <div className="flex space-x-3 pt-2">
                                <Link to="/login" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                                    <Button variant="outline" className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className="w-full bg-[#6A38C2] hover:bg-[#7b5fac] dark:bg-[#7B5FAC] dark:hover:bg-[#8A6FC5] text-white">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="pt-2 space-y-2">
                                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start space-x-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        <User2 className="h-4 w-4" />
                                        <span>View Profile</span>
                                    </Button>
                                </Link>

                                <Button
                                    variant="ghost"
                                    className="w-full justify-start space-x-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Logout</span>
                                </Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    )
}

export default Navbar



// import React from 'react'
// import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
// import { Button } from "@/components/ui/button"
// import {
//     Avatar,
//     AvatarFallback,
//     AvatarImage,
// } from "@/components/ui/avatar"
// import { LogOut, User2 } from 'lucide-react'
// import { Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'


// const Navbar = () => {

//     const {user} = useSelector(store=>store.auth)
//     return (
//         <div className='bg-white px-4 border-b border-b-stone-300'>
//             <div className='flex items-center justify-between mx-auto max-w-7xl h-14'>
//                 <div>
//                    <Link to="/"><h1 className='text-2xl font-bold'>Next<span className='text-[#F83002] '>Carrer</span></h1></Link>
//                 </div>
//                 <div className='flex items-center gap-4'>
//                     <ul className='flex font-medium items-center gap-5'>
//                         <li><Link to='/'>Home</Link></li>
//                         <li><Link to='/jobs'>Jobs</Link></li>
//                         <li><Link to='/browse'>Browse</Link></li>
//                     </ul>
//                     {
//                         !user ? (<div className='flex items-center gap-2'>
//                             <Link to="/login"><Button variant="outline">Login</Button></Link>
//                             <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#7b5fac]">Signup</Button></Link>
//                         </div>
//                         ) : (
//                             <Popover>
//                                 <PopoverTrigger asChild>
//                                     <Avatar className="cursor-pointer">
//                                         <AvatarImage src="/Account.png" alt="@shadcn" />
//                                     </Avatar>
//                                 </PopoverTrigger>
//                                 <PopoverContent className="w-80">
//                                     <div className="">
//                                         <div className="flex gap-2 space-y-2">
//                                             <Avatar className="cursor-pointer">
//                                                 <AvatarImage src="/Account.png" alt="@shadcn" />
//                                             </Avatar>
//                                             <div>
//                                                 <h4 className="font-medium">Virendra Nawkar</h4>
//                                                 <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet.</p>
//                                             </div>
//                                         </div>

//                                         <div className="flex flex-col my-2 text-gray-600">
//                                             <div className="flex w-fit items-center gap-2 cursor-pointer">
//                                                 <User2 />
//                                                 <Button variant="link"><Link to="/profile">View Profile</Link></Button>
//                                             </div>

//                                             <div className="flex w-fit items-center gap-2 cursor-pointer">
//                                                 <LogOut />
//                                                 <Button variant="link">Logout</Button>
//                                             </div>
//                                         </div>
//                                     </div>

//                                 </PopoverContent>
//                             </Popover>
//                         )
//                     }
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Navbar
