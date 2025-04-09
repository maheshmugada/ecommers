'use client'
import Image from 'next/image'
import { useState } from 'react'
import Frame from '../../public/Frame.png'
// import visibility from '../../public/visibility.png'
import Link from 'next/link'
import axios from 'axios'
import { enqueueSnackbar, SnackbarProvider } from 'notistack'
const ForgotPassword1 = () => {
    const [valid, setvalid] = useState(true)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState<any>({});
    //   const [showPassword, setShowPassword] = useState(false);

    //   const handleTogglePasswordVisibility = () => {
    //     setShowPassword(!showPassword);
    //   }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        let isvalid = true;
        let validationErrors: { [key: string]: string } = {}

        if (formData.email === "" || formData.email === null) {
            isvalid = false;
            validationErrors.email = "Email required;"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            isvalid = false;
            validationErrors.email = "Email is not valid;"
        }

        // if (formData.password === "" || formData.password === null) {
        //   isvalid = false;
        //   validationErrors.password = "Password required;"
        // } else if (formData.password.length < 6) {
        //   isvalid = false;
        //   validationErrors.password = "password length at least 6 char;"
        // }
        setErrors(validationErrors)
        setvalid(isvalid)
        console.log("Response")
        const params = {
            "email": formData.email,
            "password": formData.password
        }
        const headers = {
            "Content-Type": "application/json"
        };

        const result = await axios.post("http://18.60.132.118:8000/api/login", params, {
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
                        <h1 className="text-center font-bold text-xl  pb-8">Enter Email ID To Reset Password</h1>

                        <div className="">
                            <label className="font-semibold pb">Email</label>
                            <div className="">
                                <input
                                    className="py-2 bg-gray-50 w-80 rounded-3xl placeholder:px-4 px-4 border-none outline-none"
                                    type="text"
                                    name="email"
                                    placeholder="Type here"

                                    onChange={(event) =>
                                        setFormData({ ...formData, email: event.target.value })
                                    }
                                />
                            </div>
                        </div>
                        {valid ? (
                            <></>
                        ) : (
                            <span className='text-red-500 text-sm'>
                                {errors.email}
                            </span>
                        )}
                        <Link href="/ResetPassword">
                            <button
                                className="bg-blue-950 w-80 py-2 rounded-3xl mt-8 font-semibold text-white"

                            >

                                Submit

                            </button>
                        </Link>
                        {/* <p className="text-center pt-4 text-blue-400 font-semibold "></p> */}
                        <button onClick={() => enqueueSnackbar('That was easy!')}>Show snackbar</button>

                    </form>
                </div>
            </div>
        </div>
     </SnackbarProvider>
    )
}

export default ForgotPassword1