import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        await auth();
    };
    
    const auth = async () => {
        const data = new FormData();
        data.append('email', email);
        data.append('password', password);
    
        try {
            const res = await axios.post("http://localhost/project/api/login.php", data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
    
            if (res.data.success) {
                // setMessage(res.data.success);
                setTimeout(() => {
                    // navigate('/productlist');
                }, 2000);
            }
        } catch (error) {
            // Handle error, perhaps set error state
            console.error('Error Logging in:', error);
        }
    };
    return (
        <div className='flex flex-col'>
            <h1 className='text-3xl mx-auto mt-5 font-bold'>Log In</h1>
            <form action="" autoComplete="off" className="flex flex-col my-3 mx-auto p-5 md:p-10 border w-3/4 md:w-1/2 xl:w-1/3 rounded-xl" onSubmit={handleSubmit}>
                <label htmlFor="Email" className="mt-4 text-xl">
                    Email :
                </label>
                <input
                    type="email"
                    required
                    className={'my-1 border rounded mx-2 '}
                    placeholder=" Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />               
                <label htmlFor="Password" className="mt-4 text-xl">
                    Password :
                </label>
                <input
                    type="password"
                    required
                    className={`my-1 border rounded mx-2`}
                    placeholder=" Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button type="submit" className="border-2 border-white text-xl mx-auto px-3 w-3/4 md:w-1/3 mt-4 bg-[#28a745] text-white hover:bg-[#218838] font-thin rounded">
                    LOGIN
                </button>
            </form>
            {/* <span className="mx-auto my-2">
                Don't Have an Account?{' '}
                <span className="text-blue-500 underline">
                    <Link to="/signup">Register</Link>
                </span>
            </span> */}
        </div>
    );
}

export default Login