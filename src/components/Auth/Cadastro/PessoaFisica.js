import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  cpf: Yup.string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Invalid CPF format')
    .required('CPF is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const PessoaFisica = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [error, setError] = useState('');
  const history = useHistory();

  const onSubmit = async (data) => {
    try {
      // Call API to register user
      console.log(data);
      history.push('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-blueGray-500 text-sm font-bold">
                  Sign up as Individual
                </h6>
              </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={handleSubmit(onSubmit)}>
                {error && (
                  <div className="bg-red-500 text-white p-2 mb-4 rounded">
                    {error}
                  </div>
                )}
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Name"
                    {...register('name')}
                  />
                  {errors.name && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </div>
                  )}
                </div>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="cpf"
                  >
                    CPF
                  </label>
                  <input
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="CPF"
                    {...register('cpf')}
                  />
                  {errors.cpf && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.cpf.message}
                    </div>
                  )}
                </div>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Email"
                    {...register('email')}
                  />
                  {errors.email && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </div>
                  )}
                </div>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Password"
                    {...register('password')}
                  />
                  {errors.password && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </div>
                  )}
                </div>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Confirm Password"
                    {...register('confirmPassword')}
                  />
                  {errors.confirmPassword && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword.message}
                    </div>
                  )}
                </div>
                <div className="text-center mt-6">
                  <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex flex-wrap mt-6 relative">
            <div className="w-1/2 text-right">
              <Link to="/auth/login" className="text-blueGray-200">
                <small>Already have an account?</small>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PessoaFisica;