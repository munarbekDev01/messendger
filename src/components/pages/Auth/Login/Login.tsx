"use client";
import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import scss from "./Login.module.scss";
import { useRouter } from "next/navigation";
import { useLoginPostMutation } from "@/redux/api/instagram";
import { motion } from "framer-motion";

interface ILoginInput {
    username: string;
    password: string;
}

const Login: FC = () => {
    const { register, handleSubmit } = useForm<ILoginInput>();
    const router = useRouter();
    const [post] = useLoginPostMutation();
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit: SubmitHandler<ILoginInput> = async (data) => {
        setErrorMessage("");
        try {
            const res = await post(data);
            
            if (!res) return ;
            localStorage.setItem("auth",JSON.stringify({user : res.data.user.username , email : res?.data?.user?.email, access : res?.data?.access }) );
            router.push("/");
        } catch (error) {
            setErrorMessage("Ошибка входа. Проверьте логин и пароль.");
        }
    };

    return (
        <motion.section 
            className={scss.Login}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container">
                <motion.div 
                    className={scss.content}
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1>Вход</h1>
                    {errorMessage && <motion.p className={scss.error} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>{errorMessage}</motion.p>}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <motion.input 
                            {...register("username")} 
                            type="text" 
                            placeholder="Логин"
                            whileFocus={{ scale: 1.05 }}
                        />
                        <motion.input 
                            {...register("password")} 
                            type="password" 
                            placeholder="Пароль"
                            whileFocus={{ scale: 1.05 }}
                        />
                        <motion.button 
                            type="submit"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            Войти
                        </motion.button>
                    </form>
                    <p>
                        Нет аккаунта? <motion.a onClick={() => router.push("/auth/register")} whileHover={{ scale: 1.1 }}>Зарегистрироваться</motion.a>
                    </p>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Login;
