import React from 'react';
import visibility from '../../public/visibility.png';
import Image from 'next/image';

// interface InputPageProps {
//     formData: any;
//     setFormData: (val: any) => void;
//     errors: any;
//     showPassword?: boolean;
//     handleTogglePasswordVisibility?: () => void;
//     showEmail?: boolean;
//     showPasswordInput?: boolean;
//     showConfirmPasswordInput?: boolean;
// }

const InputPage = ({
    formData,
    setFormData,
    errors,
    showPassword ,
    handleTogglePasswordVisibility,
    showEmail,
    showPasswordInput ,
    showConfirmPasswordInput
}:any) => {
    return (
        <div>
            {showEmail && (
                <div>
                    <label className="font-semibold">Email</label>
                    <input
                        className="py-2 bg-gray-50 w-80 rounded-3xl px-4 border-none outline-none"
                        type="text"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                </div>
            )}

            {showPasswordInput && (
                <div className="mt-4">
                    <label className="font-semibold">Password</label>
                    <div className="relative">
                        <input
                            className="py-2 bg-gray-50 w-80 rounded-3xl px-4 border-none outline-none"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        {handleTogglePasswordVisibility && (
                            <div
                                className="absolute top-2 right-2 cursor-pointer"
                                onClick={handleTogglePasswordVisibility}
                            >
                                <Image src={visibility} alt="Toggle visibility" />
                            </div>
                        )}
                    </div>
                    {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                </div>
            )}

            {showConfirmPasswordInput && (
                <div className="mt-4">
                    <label className="font-semibold">Confirm Password</label>
                    <div className="relative">
                        <input
                            className="py-2 bg-gray-50 w-80 rounded-3xl px-4 border-none outline-none"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />
                        {handleTogglePasswordVisibility && (
                            <div
                                className="absolute top-2 right-2 cursor-pointer"
                                onClick={handleTogglePasswordVisibility}
                            >
                                <Image src={visibility} alt="Toggle visibility" />
                            </div>
                        )}
                    </div>
                    {errors.confirmPassword && (
                        <span className="text-red-500 text-sm">{errors.confirmPassword}</span>
                    )}
                </div>
            )}
        </div>
    );
};

export default InputPage;
