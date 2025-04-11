'use client'
import Image from 'next/image'
import { useState } from 'react'
import Frame from '../../public/Frame.png'
import visibility from '../../public/visibility.png'
import Link from 'next/link'
import axios from 'axios'
import { enqueueSnackbar, SnackbarProvider, useSnackbar } from 'notistack'
import InputPage from '@/components/Inputs/page'

const ResetPassword = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: '',
    })
    const [errors, setErrors] = useState<any>({
        newPassword: '',
        confirmPassword: '',
    })
    const [valid, setValid] = useState(true)
    const [showPassword, setShowPassword] = useState(false);




    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        let isValid = true;
        let validationErrors: { [key: string]: string } = {}

        if (!formData.newPassword) {
            isValid = false;
            validationErrors.newPassword = "Password required;";
        } else if (formData.newPassword.length < 6) {
            isValid = false;
            validationErrors.newPassword = "Password length should be at least 6 characters;";
        }

        if (formData.confirmPassword !== formData.newPassword) {
            isValid = false;
            validationErrors.confirmPassword = "NewPassword and ConfirmPassword should not be the same";
        }

        setErrors(validationErrors);
        setValid(isValid);
        console.log("Response")

        const params = {
            "newPassword": formData.newPassword,
            "confirmPassword": formData.confirmPassword,
        }

        const headers = {
            "Content-Type": "application/json"
        };

        const result = await axios.post("http://18.60.132.118:8000/api/resetPassword", params, {
            headers: headers
        });
        if (result.data.success === true) {
            console.log("first")
            console.log(result)
            enqueueSnackbar("Login Successfull", { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' }, style: { fontFamily: 'Poppins', fontWeight: '500' } });
        } else {
            enqueueSnackbar("Login Failed", { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'right' }, style: { fontFamily: 'Poppins', fontWeight: '500' } });
        }
    }

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
                            
                            <InputPage
                                formData={formData}
                                setFormData={setFormData}
                                errors={errors}
                                showPasswordInput={true}
                                showConfirmPasswordInput={true}
                                showPassword={showPassword}
                                handleTogglePasswordVisibility={handleTogglePasswordVisibility}
                            />

                            <Link href="/Login">

                                <button
                                    className="bg-blue-950 w-80 py-2 rounded-3xl mt-8 font-semibold text-white"

                                >
                                    Submit

                                </button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </SnackbarProvider>
    )
}

export default ResetPassword