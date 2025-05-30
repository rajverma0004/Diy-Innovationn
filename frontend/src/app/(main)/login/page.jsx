'use client';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
    const router = useRouter();
    const { login } = useAuth();

    const loginForm = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            try {
                const result = await login(values.email, values.password);
                if (result.success) {
                    toast.success('Logged in successfully');
                    router.push('/');
                    resetForm();
                } else {
                    toast.error(result.error || 'Login failed');
                }
            } catch (err) {
                console.error(err);
                toast.error('Something went wrong');
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <div className='bg-cover pt-10 min-h-screen' style={{backgroundImage: `url('https://images.saymedia-content.com/.image/t_share/MTkyOTkyMzE2OTQ3MjQ0MjUz/website-background-templates.jpg')`}}>
            <div className='max-w-md rounded-lg border shadow mx-auto mt-5 py-6 px-5 bg-white'>
                <h3 className='text-2xl my-6 text-center font-bold'>Login Form</h3>

                <form onSubmit={loginForm.handleSubmit}>
                    <div className='mb-5'>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            onChange={loginForm.handleChange}
                            value={loginForm.values.email}
                            className='w-full border border-gray-400 rounded-lg px-3 py-2 mt-1 text-black'
                        />
                    </div>

                    <div className='mb-5'>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            onChange={loginForm.handleChange}
                            value={loginForm.values.password}
                            className='w-full border border-gray-400 rounded-lg px-3 py-2 mt-1 text-black'
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loginForm.isSubmitting}
                        className='w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg disabled:opacity-50'
                    >
                        {loginForm.isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className='text-center mt-4'>
                    Don't have an account?{' '}
                    <Link href="/signup" className='text-blue-500 hover:text-blue-600'>
                        Sign up here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;