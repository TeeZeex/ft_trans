import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('/api/users/login', { email, password });
            const { accessToken } = response.data;
            // A proper solution would decode the JWT to get user info
            // For now, let's just create a mock user object.
            const userPayload = JSON.parse(atob(accessToken.split('.')[1]));
            login(accessToken, userPayload);
            navigate('/');
        } catch (err) {
            setError('Invalid email or password.');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition">Login</button>
                </form>
                <p className="text-center text-gray-400 mt-6">
                    Don't have an account? <Link to="/register" className="text-blue-400 hover:underline">Register here</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
