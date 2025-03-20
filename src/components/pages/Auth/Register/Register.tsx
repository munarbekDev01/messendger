"use client";
import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import scss from "./Register.module.scss";
import { useLoginPostMutation, useRegisterPostMutation } from "@/redux/api/instagram";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface IFormInput {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    age: number;
    phone_number: string;
    bio: string;
    image: string;
    website: string;
    password: string;
}

const Register: FC = () => {
    const [post] = useRegisterPostMutation();
    const [logPost] = useLoginPostMutation()
    const { register, handleSubmit } = useForm<IFormInput>();
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        setErrorMessage("");
        const newReg = {
            username: data.username,
            email: data.email,
            first_name: data.first_name || "string",
            last_name: data.last_name || "string",
            age: Number(data.age),
            phone_number: data.phone_number,
            bio: data.bio || "string",
            image:  null,
            website: data.website,
            password: data.password,
        };
        try {
            await post(newReg).unwrap();
            alert("Successfully registered");
            try {
                const res = await logPost({ username: data.username, password: data.password }).unwrap();
                if (!res) return;
            
                if (typeof window !== "undefined") {
                    localStorage.setItem("auth", JSON.stringify({
                        user: res.data.user.username,
                        email: res.data.user.email,
                        access: res.data.access,
                    }));
                }
                
                localStorage.setItem(
                    "auth",
                    JSON.stringify({
                        user: res.data.user.username,
                        email: res.data.user.email,
                        access: res.data.access,
                    })
                );
                router.push("/");
            } catch (error) {
                alert("не получилось сразу войти в аккаунт попробуйте вручную войти");
            }
            
        } catch (error) {
            setErrorMessage("Ошибка регистрации. Проверьте данные.");
        }
    };

    return (
        <motion.section 
            className={scss.Register}
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
                    <h1>Регистрация</h1>
                    {errorMessage && <motion.p className={scss.error} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>{errorMessage}</motion.p>}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={scss.inputs}>
                            <motion.input {...register("username", { required: "Username обязателен" })} type="text" placeholder="Username" whileFocus={{ scale: 1.05 }} />
                            <motion.input {...register("email", { required: "Email обязателен" })} type="email" placeholder="Email" whileFocus={{ scale: 1.05 }} />
                            <motion.input {...register("first_name")} type="text" placeholder="Имя (необязательно)" whileFocus={{ scale: 1.05 }} />
                        </div>
                        <div className={scss.inputs}>
                            <motion.input {...register("last_name")} type="text" placeholder="Фамилия (необязательно)" whileFocus={{ scale: 1.05 }} />
                            <motion.input {...register("age", { required: "Возраст обязателен", min: { value: 18, message: "Возраст должен быть 18 или старше" } })} type="number" placeholder="Возраст 18< >65" whileFocus={{ scale: 1.05 }} />
                            <motion.input {...register("phone_number", { required: "Телефон обязателен", pattern: { value: /^\+/, message: "Номер должен начинаться с '+'" } })} defaultValue={"+996"}  type="tel" placeholder="Телефон" whileFocus={{ scale: 1.05 }} />
                        </div>
                        <div className={scss.inputs}>
                            <motion.input {...register("image")} type="text" placeholder="IMG (URL) необязательно" whileFocus={{ scale: 1.05 }} />
                            <motion.input {...register("website", { required: "Веб-сайт обязателен" })} type="url" placeholder="Веб-сайт (URL)" whileFocus={{ scale: 1.05 }} />
                            <motion.input {...register("password", { required: "Пароль обязателен" })} type="password" placeholder="Пароль" whileFocus={{ scale: 1.05 }} />
                        </div>
                        <motion.textarea {...register("bio")} placeholder="О себе (необязательно)" whileFocus={{ scale: 1.05 }}></motion.textarea>
                        <div className={scss.btns}>
                            <p>Уже есть аккаунт? <motion.a onClick={() => router.push("/auth/login")} whileHover={{ scale: 1.1 }}>Войти</motion.a></p>
                            <motion.button type="submit" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                Зарегистрироваться
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Register;
