import { ChartNoAxesCombined, Eye, EyeOff, Headset, Lock, Mail, ShieldCheck, User, Zap } from "lucide-react"
import Logo from "../../../components/ui/Logo"
import { useNavigate } from "react-router-dom"
import { useRegister } from "../../../hooks/useRegister";
import { useRegisterForm } from "../../../hooks/useRegisterForm";
import { type RegisterFormData } from "../schemas/register.schema";
import { useState } from "react";
import type { RegisterDto } from "../../../types";

export const RegisterForm = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const { mutateAsync, isPending } = useRegister();

    const { register, handleSubmit, formState: { errors, isSubmitting },
    } = useRegisterForm();

    const onSubmit = async (data: RegisterFormData) => {
        try {
            const payload: RegisterDto = {
                name: data.name,
                email: data.email,
                password: data.password,
            };
            await mutateAsync(payload);

            navigate("/login")
        } catch (error) {
            console.log("REGISTER ERROR:", error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-3">
            <div className="w-full max-w-7xl rounded-3xl overflow-hidden shadow-xl grid lg:grid-cols-2">
                {/* left-side */}
                <div className="relative bg-linear-to-br from-slate-50 to-blue-50 pl-10">
                    <div className="mb-5">
                        <Logo />
                    </div>

                    <div className="text-2xl font-bold">
                        <h2>Créez votre compte
                            <br />
                            <span className="text-blue-700"> et simplifiez la gestion
                                <br />
                                de vos colis
                            </span>
                        </h2>
                        <p className="text-slate-600 text-xs mb-8 mt-5 max-w-lg">Rejoingnez des milliers d'entreprises qui nous font déjà <br /> confiances pour optimiser leur logistique</p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex gap-2">
                            <div className="w-10 h-10 rounded-xl border border-blue-200 bg-blue-50 flex items-center justify-center">
                                <ShieldCheck className=" text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">Sécurisé</h3>
                                <p className="text-slate-600 text-sm">Vos données sont protègées et cryptées </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-10 h-10 rounded-xl border border-blue-200 bg-blue-50 flex items-center justify-center">
                                <Zap className=" text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">Rapide</h3>
                                <p className="text-slate-600 text-sm">Créez votre compte en moins d'une minute</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-10 h-10 rounded-xl border border-blue-200 bg-blue-50 flex items-center justify-center">
                                <ChartNoAxesCombined className=" text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">Performant</h3>
                                <p className="text-slate-600 text-sm">Acédez à tous outlis puissants</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="w-10 h-10 rounded-xl border border-blue-200 bg-blue-50 flex items-center justify-center">
                                <Headset className=" text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">Support dédié</h3>
                                <p className="text-slate-600 text-sm">Notre équipe vous accompagne á chaque étape</p>
                            </div>
                        </div>
                    </div>

                    {/* Illustration */}
                    {/* <div className="mt-14 flex justify-center">
                        <img className="max-w-xs" src="/public/img-illustre.png" alt="illutration" />
                    </div> */}
                </div>

                {/* RIGHT SIDE */}
                <div className="p-8">
                    <h2 className="text-xl font-semibold">Créez un compte gratuitement</h2>
                    <p className="flex items-center gap-1 text-slate-600 text-sm mt-3 mb-5">
                        <span>Déjà un compte ?</span>
                        <span onClick={() => navigate("/connexion")}
                            className="text-blue-500 hover:text-blue-600 font-semibold cursor-pointer"
                        >
                            Connectez-vous
                        </span>
                    </p>
                    
                    {/* formulaire */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-5">
                            {/* <div>
                                <label className="block mb-2 text-xs font-bold">Prénoms</label>
                                <div className="relative">
                                    <User size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />
                                    <input type="text"
                                        placeholder="Entrez votre prénoms"
                                        className="w-full border border-slate-300  rounded-md pl-12 pr-13 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
                                    />
                                </div>
                            </div> */}
                            <div>
                                <label className="block mb-2 text-xs font-bold">Nom</label>
                                <div className="relative">
                                    <User size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                    />
                                    <input type="text"
                                        placeholder="Entrez votre nom"
                                        {...register("name")}
                                        className="w-full border border-slate-300 rounded-md pl-12 pr-13 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700  "
                                    />
                                </div>
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                            </div>
                        </div>

                        {/* email */}
                        <div>
                            <label className="block mb-2 text-xs font-bold">Email</label>
                            <div className="relative">
                                <Mail size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                                <input type="email"
                                    placeholder="Entrez votre mail"
                                    {...register("email")}
                                    className="w-full border border-slate-300 rounded-md pl-12 pr-13 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700  "
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        {/* password */}
                        <div>
                            <label className="block mb-2 text-xs font-bold">Mot de passe</label>
                            <div className="relative">
                                <Lock size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />
                                <input type={showPassword ? "text" : "password"}
                                    placeholder="Créez un mot de passe"
                                    {...register("password")}
                                    className="w-full border border-slate-300 rounded-md pl-12 pr-13 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700  "
                                />

                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        {/* confirm password */}
                        <div>
                            <label className="block mb-2 text-xs font-bold">Confirmer le mot de passe</label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirmer le mot de passe"
                                    {...register("confirmPassword")}
                                    className="w-full border border-slate-300 rounded-md pl-12 pr-13 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700  "
                                />

                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                        </div>

                        {/* button */}
                        <button
                            type="submit"
                            disabled={isSubmitting || isPending}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPending ? "Création du compte..." : "S'inscrire"}
                        </button>
                    </form>
                </div>
                <div>
                </div>
            </div>
            <p className="mt-5 mb-2 text-slate-500 flex items-center gap-2">
                <ShieldCheck size={18} className="text-blue-600" />
                Vos données sont sécurisées et ne seront jamais partagées
            </p>
        </div>
    );
}