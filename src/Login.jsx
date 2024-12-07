import axios from 'axios';
import { useState } from 'react';
import Loader from './Loader';
import APIS from './admin/APIS';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [User, SetUser] = useState({
        username: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();  // React Router hook for navigation

    const handleChange = (e) => {
        SetUser({ ...User, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
    
        try {
            const response = await axios.post(APIS.LOGIN, {
                username: User.username,
                password: User.password,
            });
    
            if (response.status === 200) {
                const { role, data } = response.data;
    
                if (role === 'admin') {
                    localStorage.setItem('admin', JSON.stringify(data));
                    localStorage.setItem('role', role);
                    navigate('home');

                } else if (role === 'student') {
                    localStorage.setItem('student', JSON.stringify(data));
                    localStorage.setItem('role', role);
                    navigate('/studenthome');
                }   else if (role === 'faculty') {
                    localStorage.setItem('faculty', JSON.stringify(data));
                    localStorage.setItem('role', role);
                    navigate('/facultyhome');
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Invalid username or password.');
            } else {
                setError('Login failed. Please try again later.');
            }
        } finally {
            SetUser({
                username: '',
                password: ''
            });
            setLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96 relative z-10">
                <h1 className="text-3xl font-semibold text-center mb-6 text-blue-600">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="username">
                            Username:
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={User.username}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                            Password:
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={User.password}
                            onChange={handleChange}
                            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit
                    </button>
                </form>
                {loading && (<Loader />)}

                {error && (
                    <div className="mt-4 text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
}
