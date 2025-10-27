"use client";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn, getSession } from "next-auth/react";
import { useState } from "react";
import AnimatedBubbleParticles from "@/components/lightswind/AuthAnimation";
// import { useRouter } from "next/router";

// Zod validation schema
const registerSchema = z
   .object({
      firstName: z.string().min(2, "First name must be at least 2 characters"),
      lastName: z.string().min(2, "Last name must be at least 2 characters"),
      email: z.string().email("Please enter a valid email address"),
      password: z
         .string()
         .min(8, "Password must be at least 8 characters")
         .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
      confirmPassword: z.string(),
      agreeToTerms: z.boolean().refine((val) => val === true, "You must agree to the terms and conditions"),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
   });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
   // const router = useRouter();
   const [isLoading, setIsLoading] = useState(false);
   const [authError, setAuthError] = useState("");

   const { control, handleSubmit, formState } = useForm<RegisterFormData>({
      resolver: zodResolver(registerSchema),
      defaultValues: {
         firstName: "",
         lastName: "",
         email: "",
         password: "",
         confirmPassword: "",
         agreeToTerms: false,
      },
   });

   const onSubmit = async (data: RegisterFormData) => {
      setIsLoading(true);
      setAuthError("");

      try {
         // Replace with your actual registration API call
         // const response = await fetch("/api/auth/register", {
         //    method: "POST",
         //    headers: {
         //       "Content-Type": "application/json",
         //    },
         //    body: JSON.stringify({
         //       firstName: data.firstName,
         //       lastName: data.lastName,
         //       email: data.email,
         //       password: data.password,
         //    }),
         // });

         // if (response.ok) {
         //    // Auto-login after successful registration
         //    const result = await signIn("credentials", {
         //       email: data.email,
         //       password: data.password,
         //       redirect: false,
         //    });

         //    // if (result?.error) {
         //    //    router.push("/login?message=Registration successful. Please sign in.");
         //    // } else {
         //    //    router.push("/dashboard");
         //    // }
         // } else {
         //    const errorData = await response.json();
         //    setAuthError(errorData.message || "Registration failed");
         // }
         console.log("data", data);
      } catch (error) {
         setAuthError("An error occurred during registration");
      } finally {
         setIsLoading(false);
      }
   };

   const handleSocialLogin = async (provider: "google" | "facebook") => {
      setIsLoading(true);
      setAuthError("");

      try {
         await signIn(provider, { callbackUrl: "/dashboard" });
      } catch (error) {
         setAuthError(`Failed to sign in with ${provider}`);
         setIsLoading(false);
      }
   };

   return (
      <AnimatedBubbleParticles className="bg-gradient-to-b from-blue-900 to-red-400" particleColor="#a3120d" particleSize={40} spawnInterval={200} height="100vh" enableGooEffect>
         <div className="min-h-screen  flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
               <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Create your account</h2>
               <p className="mt-2 text-center text-sm text-input">
                  Already have an account?{" "}
                  <a href="/login" className="font-medium text-yellow-600 hover:text-purple-500">
                     Sign in
                  </a>
               </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-3xl">
               <div className="bg-white/50 py-8 px-6 shadow-2xl rounded-2xl sm:px-10 border border-gray-100">
                  {/* Social Login Buttons */}
                  <div className="space-y-3">
                     <button
                        type="button"
                        onClick={() => handleSocialLogin("google")}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                     >
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                           <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                           <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                           <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                           <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Sign up with Google
                     </button>

                     <button
                        type="button"
                        onClick={() => handleSocialLogin("facebook")}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                     >
                        <svg className="w-5 h-5 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                           <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Sign up with Facebook
                     </button>
                  </div>

                  <div className="mt-6">
                     <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                           <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                           <span className="px-2 bg-input rounded-4xl text-gray-500">Or register with email</span>
                        </div>
                     </div>
                  </div>

                  <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
                     {authError && (
                        <div className="rounded-md bg-red-50 p-4">
                           <div className="flex">
                              <div className="flex-shrink-0">
                                 <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                       fillRule="evenodd"
                                       d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                       clipRule="evenodd"
                                    />
                                 </svg>
                              </div>
                              <div className="ml-3">
                                 <h3 className="text-sm font-medium text-red-800">{authError}</h3>
                              </div>
                           </div>
                        </div>
                     )}

                     <div className="grid grid-cols-2 gap-4">
                        <Controller
                           name="firstName"
                           control={control}
                           render={({ field, fieldState }) => (
                              <div>
                                 <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                                    First name
                                 </label>
                                 <div className="mt-1">
                                    <input
                                       {...field}
                                       type="text"
                                       autoComplete="given-name"
                                       className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-1 sm:text-sm ${
                                          fieldState.invalid ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                                       }`}
                                       placeholder="John"
                                    />
                                    {fieldState.invalid && <p className="mt-1 text-sm text-red-600">{fieldState.error?.message}</p>}
                                 </div>
                              </div>
                           )}
                        />

                        <Controller
                           name="lastName"
                           control={control}
                           render={({ field, fieldState }) => (
                              <div>
                                 <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                    Last name
                                 </label>
                                 <div className="mt-1">
                                    <input
                                       {...field}
                                       type="text"
                                       autoComplete="family-name"
                                       className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-1 sm:text-sm ${
                                          fieldState.invalid ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                                       }`}
                                       placeholder="Doe"
                                    />
                                    {fieldState.invalid && <p className="mt-1 text-sm text-red-600">{fieldState.error?.message}</p>}
                                 </div>
                              </div>
                           )}
                        />
                     </div>

                     <Controller
                        name="email"
                        control={control}
                        render={({ field, fieldState }) => (
                           <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                 Email address
                              </label>
                              <div className="mt-1">
                                 <input
                                    {...field}
                                    type="email"
                                    autoComplete="email"
                                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-1 sm:text-sm ${
                                       fieldState.invalid ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                                    }`}
                                    placeholder="you@example.com"
                                 />
                                 {fieldState.invalid && <p className="mt-1 text-sm text-red-600">{fieldState.error?.message}</p>}
                              </div>
                           </div>
                        )}
                     />

                     <Controller
                        name="password"
                        control={control}
                        render={({ field, fieldState }) => (
                           <div>
                              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                 Password
                              </label>
                              <div className="mt-1">
                                 <input
                                    {...field}
                                    type="password"
                                    autoComplete="new-password"
                                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-1 sm:text-sm ${
                                       fieldState.invalid ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                                    }`}
                                    placeholder="••••••••"
                                 />
                                 {fieldState.invalid && <p className="mt-1 text-sm text-red-600">{fieldState.error?.message}</p>}
                                 <p className="mt-1 text-xs text-gray-500">Must be at least 8 characters with uppercase, lowercase, and number</p>
                              </div>
                           </div>
                        )}
                     />

                     <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field, fieldState }) => (
                           <div>
                              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                 Confirm password
                              </label>
                              <div className="mt-1">
                                 <input
                                    {...field}
                                    type="password"
                                    autoComplete="new-password"
                                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-1 sm:text-sm ${
                                       fieldState.invalid ? "border-red-300 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                                    }`}
                                    placeholder="••••••••"
                                 />
                                 {fieldState.invalid && <p className="mt-1 text-sm text-red-600">{fieldState.error?.message}</p>}
                              </div>
                           </div>
                        )}
                     />

                     <Controller
                        name="agreeToTerms"
                        control={control}
                        render={({ field, fieldState }) => {
                           const { value, ...checkboxField } = field;
                           return (
                              <div className="flex items-start">
                                 <div className="flex items-center h-5">
                                    <input {...checkboxField} id="agreeToTerms" type="checkbox" checked={Boolean(value)} className="focus:ring-purple-500 h-4 w-4 text-purple-600 border-gray-300 rounded" />
                                 </div>
                                 <div className="ml-3 text-sm">
                                    <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
                                       I agree to the{" "}
                                       <a href="/terms" className="text-purple-600 hover:text-purple-500">
                                          Terms and Conditions
                                       </a>{" "}
                                       and{" "}
                                       <a href="/privacy" className="text-purple-600 hover:text-purple-500">
                                          Privacy Policy
                                       </a>
                                    </label>
                                    {fieldState.invalid && <p className="mt-1 text-sm text-red-600">{fieldState.error?.message}</p>}
                                 </div>
                              </div>
                           );
                        }}
                     />
                     <div>
                        <button
                           type="submit"
                           disabled={isLoading || formState.isSubmitting}
                           className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                        >
                           {isLoading ? (
                              <div className="flex items-center">
                                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                 </svg>
                                 Creating account...
                              </div>
                           ) : (
                              "Create account"
                           )}
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </AnimatedBubbleParticles>
   );
}
