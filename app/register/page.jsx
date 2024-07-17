'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import validator from 'validator';
// import axios from 'axios';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
export default function Register() {
     const router = useRouter();
     const [formData, setFormData] = useState({
       name: '',
       email: '',
       password: '',
     });
     const [validationErrors, setValidationErrors] = useState({
       name: '',
       email: '',
       password: '',
     });
     const [showPassword, setShowPassword] = useState(false);
     const [loading, setLoading] = useState(false);
     const handleChange = (e) => {
       const { name, value } = e.target;
       setFormData({ ...formData, [name]: value });
       validateField(name, value.trim());
     };

     const validateField = (fieldName, value) => {
       let error = '';

       switch (fieldName) {
         case 'name':
           const nameParts = value.split(' ');
           if (nameParts.length < 2) {
             error = 'Name too short. Use first and last name.';
           } else if (nameParts.length > 3) {
             error = 'Name too long. Middle name is optional.';
           } else if (
             nameParts.some(
               (part) => part.length < 3 || !validator.isAlpha(part),
             )
           ) {
             error = 'Invalid name. Each part should be at least 3 letters.';
           }
           break;
         case 'email':
           if (!validator.isEmail(value)) {
             error = 'Invalid email format.';
           } else {
             const emailDomain = value.split('@')[1];
             if (!isKnownEmailAlias(emailDomain)) {
               error = 'Use known email domains (e.g., gmail.com, yahoo.com).';
             }
           }
           break;
         case 'password':
           if (value.length < 8) {
             error = 'Password too short. Use minimum 8 characters.';
           } else if (!/[a-z]/.test(value)) {
             error = 'Password needs at least one lowercase letter.';
           } else if (!/[A-Z]/.test(value)) {
             error = 'Password needs at least one uppercase letter.';
           } else if (!/[0-9]/.test(value)) {
             error = 'Password needs at least one number.';
           } else if (!/[!@#$%^&*]/.test(value)) {
             error = 'Password needs at least one symbol (!@#$%^&*).';
           }
           break;
         default:
           break;
       }

       setValidationErrors({ ...validationErrors, [fieldName]: error });
     };

     const isKnownEmailAlias = (email) => {
       const knownEmailAliases = [
         'gmail.com',
         'yahoo.com',
         'outlook.com',
         'mail.com',
         'hotmail.com',
         'aol.com',
         'icloud.com',
         'live.com',
         'protonmail.com',
         'comcast.net',
         'verizon.net',
         'att.net',
         'zoho.com',
         'yandex.com',
         'cox.net',
         'earthlink.net',
         'sbcglobal.net',
         'charter.net',
         'rocketmail.com',
         'me.com',
         'optonline.net',
         'gmx.com',
         'inbox.com',
         'fastmail.com',
         'hushmail.com',
         'lavabit.com',
         'tutanota.com',
         'runbox.com',
         'mail.ru',
         'rambler.ru',
         'ukr.net',
         'bigpond.com',
         'swastikdan.in',
       ];
       return knownEmailAliases.includes(email);
     };

   const handleSubmit = async (e) => {
     e.preventDefault();
     // Check if there are any validation errors
     const hasErrors = Object.values(validationErrors).some(
       (error) => error !== '',
     );
     if (hasErrors) {
       toast.error('Please correct the validation errors before submitting.');
       return;
     }

     try {
       setLoading(true);
       const response = await fetch('/api/auth/register', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           name: formData.name,
           email: formData.email,
           password: formData.password,
         }),
       });

       if (!response.ok) {
         throw response;
       }

       setLoading(false);
       toast.success('User registered successfully.');
       router.push('/login');
     } catch (error) {
       setLoading(false);
       if (error.status === 401) {
         toast.error('User already exists.');
       } else {
         const errorMessage = await error.text();
         toast.error(`Error registering user: ${errorMessage}`);
       }
     }
   };
       async function handleOauthSignin(
         provider,
         callbackUrl = `${window.location.origin}?type=${provider}&login=true`,
       ) {
         setLoading(true);

         try {
           await signIn(provider, {
             callbackUrl: `${window.location.origin}?type=${provider}&login=true`,
           });
         } catch (error) {
           toast.error('An unexpected error occurred');
         } finally {
           setLoading(false);
         }
       }

     const togglePasswordVisibility = () => {
       setShowPassword(!showPassword);
     };

  return (
    <div className="mt-5">
      <div className="mt-12 flex grid-cols-2 flex-wrap gap-6 sm:grid">
        <button
          onClick={() => handleOauthSignin('google')}
          disabled={loading}
          className="h-11 w-full rounded-full border border-gray-300/75 bg-white px-6 transition active:bg-gray-50 disabled:opacity-70 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-700 dark:hover:bg-gray-800"
        >
          <div className="mx-auto flex w-max items-center justify-center space-x-4">
            <svg
              width="32"
              height="32"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Google icon</title>
              <path
                fill="#EA4335 "
                d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
              />
              <path
                fill="#34A853"
                d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
              />
              <path
                fill="#4A90E2"
                d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
              />
              <path
                fill="#FBBC05"
                d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
              />
            </svg>
            <span className="block w-max text-sm font-semibold tracking-wide text-cyan-700 dark:text-white">
              With Google
            </span>
          </div>
        </button>
        <button
          onClick={() => handleOauthSignin('github')}
          disabled={loading}
          className="h-11 w-full rounded-full bg-gray-900 px-6 transition hover:bg-gray-800 focus:bg-gray-700 active:bg-gray-600 disabled:opacity-70 dark:border dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-700 dark:hover:bg-gray-800"
        >
          <div className="mx-auto flex w-max items-center justify-center space-x-4 text-white">
            <svg
              width="32"
              height="32"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>GitHub icon</title>
              <path
                fill="#fff"
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              />
            </svg>
            <span className="block w-max text-sm font-semibold tracking-wide text-white">
              With Github
            </span>
          </div>
        </button>
      </div>
      <div className="flex items-center py-3 text-xs uppercase text-gray-400 before:me-6 before:flex-[1_1_0%] before:border-t before:border-gray-200 after:ms-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
        Or
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm dark:text-white"
            >
              Name
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="block w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
                required
              />
              {validationErrors.name && (
                <div className=" pointer-events-none absolute inset-y-3 end-0 pe-3">
                  <svg
                    className="size-5 text-red-500"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                  </svg>
                </div>
              )}
            </div>

            {validationErrors.name && (
              <p className="mt-2  text-xs text-red-600">
                {validationErrors.name}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm dark:text-white"
            >
              Email address
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
                required
              />
              {validationErrors.email && (
                <div className=" pointer-events-none absolute inset-y-3 end-0 pe-3">
                  <svg
                    className="size-5 text-red-500"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                  </svg>
                </div>
              )}
            </div>

            {validationErrors.email && (
              <p className="mt-2  text-xs text-red-600">
                {validationErrors.email}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="mb-2 block text-sm dark:text-white"
              >
                Password
              </label>
              <div
                className="mb-2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </div>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'} // Show or hide password based on state
                placeholder="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
                required
              />
              {validationErrors.password && (
                <div className=" pointer-events-none absolute inset-y-3 end-0 pe-3">
                  <svg
                    className="size-5 text-red-500"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                  </svg>
                </div>
              )}
            </div>

            {validationErrors.password && (
              <p className="mt-2  text-xs text-red-600">
                {validationErrors.password}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-primary px-4 py-3 text-base font-semibold   text-white hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-70 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            <Loader2
              width={24}
              height={24}
              className={`animate-spin ${loading ? 'block' : 'hidden'}`}
            />
            {loading ? '' : 'Sign up'}
          </button>
        </div>
      </form>
    </div>
  );
}
