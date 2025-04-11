'use client';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import Frame from '../../public/Frame.png';

import Link from 'next/link';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import InputPage from '@/components/Inputs/page';

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
      <div className="bg-blue-950 h-screen px-4">
        <div className="w-full max-w-md bg-white rounded-xl px-6 py-8 shadow-lg">
          <div className="flex items-center mb-6ex">
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
              <h1 className="text-center text-xl md:text-2xl font-bold mb-4">Log in</h1>

              <InputPage
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                showEmail={true}
                showPasswordInput={true}
                showPassword={showPassword}
                handleTogglePasswordVisibility={handleTogglePasswordVisibility}
              />
              
             
              <p className="text-end text-blue-400 font-semibold">
                <Link href="/ForgotPassword1">Forgot Password?</Link>
              </p>
              {/* </div> */}

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
