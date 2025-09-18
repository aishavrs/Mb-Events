import React, {useState, useContext} from 'react'
import mbLogo from '../assets/mb-event-logo.png'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthContext';
//import the icons from react icons

export default function ResetPassword() {
   const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
  
    const {token} = useParams()
    const Navigate = useNavigate()
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      setErrors({ ...errors });
    };
  
    const formValidate = () => {
    const { password, confirmPassword } = formData;
    const newErrors = {};

    if (!password) {
      newErrors.password = "Please provide a password!";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password!";
    }

    if (password && confirmPassword && confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!formValidate()) return;
      setErrors({});
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/reset-password/${token}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          }
        );
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.message );
        toast.success("New password created successfully!", {
          position: "top-center",
        });
        Navigate("/sign-in")
        return data;
      } catch (error) {
        console.log(error);
        toast.error("password reset failed", {
          position: "top-center",
        });
      } finally {
        setIsLoading(false);
      }
    };
  return (
    <div className='flex flex-col justify-center items-center gap-[28px] h-screen'>
        <img src={mbLogo} alt="" className=''/>
        <div className='flex flex-col justify-center items-left gap-3 w-[310px] lg:w-[486px]'>
            <h1 className='text-[28px] lg:text-[32px] font-medium'>Reset Password</h1>
            <p className='text-[15px] lg:text-[20px] font-normal'>Enter Your New Password</p>
            <form
            onSubmit={handleSubmit}
             className='flex flex-col gap-5'>
                <input type="text" 
                onChange={handleChange}
                value={formData.password}
                name='password'
                placeholder='Password'
                className='w-full rounded-[6px] px-[10px] py-[12px] border border-[#CDC7C7]'
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
                <input type="text" 
                onChange={handleChange}
                value={formData.confirmPassword}
                name='confirmPassword'
                placeholder='Confirm password'
                className='w-full rounded-[6px] px-[10px] py-[12px] border border-[#CDC7C7]'
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                )}
            <button type="submit" className='rounded-[4px] py-[12px] px-[36px] bg-[#9747FF] text-white text-center'>Reset Password</button>
            </form>
        </div>
    </div>
  )
}
