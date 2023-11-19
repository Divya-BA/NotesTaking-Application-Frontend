
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useForgotPasswordMutation } from '../../../features/api/apiSlice';
import { ScaleLoader } from 'react-spinners';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const [forgotPassword] = useForgotPasswordMutation();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Email is required'),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await forgotPassword(values);
        if (response?.data?.message === 'Success') {
          setSuccessMessage('Password reset link sent to your email.');
        }
      } catch (error) {
        console.error('Forgot password failed:', error);

        if (error?.response?.data?.message) {
          setSuccessMessage(`Error: ${error.response.data.message}`);
        } else {
          setSuccessMessage('An unexpected error occurred. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-cutom-white">
      <div className="w-full sm:w-96 p-8 bg-white rounded-lg shadow-lg relative">
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-70 bg-gray-100 z-10">
            <ScaleLoader color="blue" height={15} />
          </div>
        )}
        <h2 className="text-2xl font-semibold mb-4">Forgot Password</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              disabled={loading}
            >
              Reset Password
            </button>
          </div>
        </form>
        {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
