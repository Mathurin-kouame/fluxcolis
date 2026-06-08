import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import Logo from "../../../components/ui/Logo"
import { useState } from "react";
import { useLogin } from "../../../hooks/useLogin";
import { useLoginForm } from "../../../hooks/useLoginForm";
import type { LoginFormData } from "../schemas/login.schema";
import type { LoginDto } from "../../../types";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const { mutateAsync, isPending } = useLogin();

    const { register, handleSubmit, formState: { errors, isSubmitting },
    } = useLoginForm();

    const onSubmit = async (data: LoginFormData) => {
        try {
            const payload: LoginDto = {
                email: data.email,
                password: data.password,
            }
            await mutateAsync(payload);
            navigate("/dashboard")
        } catch (error) {
            console.log("ERROR_LOGIN:", error)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-3">
            <div className="w-full max-w-7xl rounded-3xl bg-white shadow-[0_0_50px_rgba(15,23,42,0.12)] grid lg:grid-cols-2">

                {/* left-side */}
                <div className="relative bg-linear-to-br from-slate-50 to-blue-50 pl-10">
                    <div className="text-3xl  sm:flex items-center">
                        <Logo />
                    </div>
                    {/* Illustration */}
                    <div className="flex justify-center">
                        <img className="" src="/public/img-illustre.png" alt="illutration" />
                    </div>
                </div>
                {/* right-side */}
                <div className="p-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-4">Connexion</h1>
                        <p className="mb-6">Connectez vous à votre compte pour contribuer à gérer vos colis</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            {/* email */}
                            <div className="mb-6">
                                <label className="block mb-2  font-bold">Email</label>
                                <div className="relative">
                                    <Mail size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />
                                    <input type="email"
                                        placeholder="Entrez votre mail"
                                        {...register("email")}
                                        className="w-full border border-slate-300 rounded-md pl-12 pr-13 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>

                            {/* password */}
                            <div>
                                <label className="block mb-2 text-md font-bold">Mot de passe</label>
                                <div className="relative">
                                    <Lock size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />
                                    <input type={showPassword ? "text" : "password"}
                                        placeholder="Créez un mot de passe"
                                        {...register("password")}
                                        className="w-full border border-slate-300 rounded-md pl-12 pr-13 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
                                    />

                                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye
                                            size={18} />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                            </div>
                           
                             <button
                                type="submit"
                                disabled={isSubmitting || isPending}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                            >
                                {isPending ? "connexion..." : "Se connecter"}
                            </button>
                            <div className="mt-8">
                            <p className="flex items-center gap-1 text-slate-600 text-sm mt-3 mb-5">
                           <span>Pas encore de compte ?</span>
                          <span onClick={() => navigate("/inscription")}
                            className="text-blue-500 hover:text-blue-600 font-semibold cursor-pointer"
                        >
                            Créez un compte
                        </span>
                    </p>
                            </div> 
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}