'use client';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import Frame from '../../public/Frame.png';
import visibility from '../../public/visibility.png';
import Link from 'next/link';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';

const Login = () => {
  const router = useRouter(); // ✅ using App Router navigation
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let validationErrors: { [key: string]: string } = {};
    let isValid = true;

    if (!formData.email) {
      validationErrors.email = 'Email required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!formData.password) {
      validationErrors.password = 'Password required';
      isValid = false;
    } else if (formData.password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(validationErrors);
    if (!isValid) return;

    try {
      const response = await axios.post('http://18.60.132.118:8000/api/login', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success === true) {
        enqueueSnackbar('Login successful', {
          variant: 'success',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });

        // ✅ Case-sensitive route match
        router.push('/home'); // make sure `/app/home/page.tsx` exists!
      } else {
        enqueueSnackbar('Login failed', {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
      }
    } catch (error) {
      enqueueSnackbar('Something went wrong', {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
      console.error('Login error:', error);
    }
  };

  return (
    <SnackbarProvider maxSnack={3}>
      <div className="bg-blue-950 h-screen">
        <div className="p-8">
          <div className="flex">
            <Image src={Frame} className="w-16 h-16" alt="Frame" />
            <div className="ml-4">
              <h1 className="text-4xl font-bold text-white">Ecommers</h1>
              <p className="text-sm text-slate-400">Powered by CRVM</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center pt-8">
          <div className="bg-white w-96 rounded-xl px-8 py-8">
            <form onSubmit={handleSubmit}>
              <h1 className="text-center font-bold text-3xl pb-4">Log in</h1>

              <label className="font-semibold">Email</label>
              <input
                className="py-2 bg-gray-50 w-80 rounded-3xl px-4 border-none outline-none"
                type="text"
                placeholder="Type here"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}

              <div className="mt-4">
                <label className="font-semibold">Enter password</label>
                <div className="relative">
                  <input
                    className="py-2 bg-gray-50 w-80 rounded-3xl px-4 border-none outline-none"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Type here"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <div
                    className="absolute top-2 right-2 cursor-pointer"
                    onClick={handleTogglePasswordVisibility}
                  >
                    <Image src={visibility} alt="Toggle visibility" />
                  </div>
                </div>
                {errors.password && (
                  <span className="text-red-500 text-sm">{errors.password}</span>
                )}
                <p className="text-end text-blue-400 font-semibold">
                  <Link href="/ForgotPassword1">Forgot Password?</Link>
                </p>
              </div>

              <button className="bg-blue-950 w-80 py-2 rounded-3xl mt-8 font-semibold text-white">
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
    </SnackbarProvider>
  );
};

export default Login;
