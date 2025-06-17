import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { appContext } from '../contexts/appContex';
import { useContext } from 'react';
import { useEffect } from 'react';

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loged, setLoged } = useContext(appContext)

    useEffect(()=>{
        if(localStorage.getItem('id')){
            navigate('/')
        }
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        if (!email || !password) {
            toast.error("Please Prvide all the fiels")
        } else {
            fetch('http://localhost:3000/singlog/login', {
                method: "POST",
                headers: {
                    'Content-Type': "Application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            }).then(res => res.json()).then(result => {
                if (result.error) {
                    toast.error(result.error)
                } else {
                    toast.success("Successfully loged in")
                    localStorage.setItem('id', result.id)
                    localStorage.setItem('jwt', result.token)
                    console.log(loged)
                    setLoged(true)
                    navigate('/')
                }
            })
        }
    };

    const signUpNav = () => {
        navigate('/signup')
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition-all duration-300"
                    >
                        Sign In
                    </button>
                </form>
                <p onClick={() => signUpNav()} className="mt-4 text-sm text-center text-gray-600">
                    Don't have an account? <a href="#" className="text-blue-500 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
