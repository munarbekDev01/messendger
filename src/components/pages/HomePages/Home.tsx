



"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { AiOutlineClose } from "react-icons/ai";
import scss from "./Home.module.scss";

const Home = () => {
    const router = useRouter();
    const [showConfetti, setShowConfetti] = useState<boolean>(true);
    const [timer, setTimer] = useState<boolean>(true);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalOpen2, setModalOpen2] = useState<boolean>(false);
    const [chatName, setChatName] = useState<string>("");

    // Проверяем доступность localStorage
    const storedAuth = typeof window !== "undefined" ? localStorage.getItem("auth") : null;
    const local = storedAuth ? JSON.parse(storedAuth) : null;

    const objParticipant = { key: chatName, id: Date.now(), user_name: local?.user, rank: "Participant" };
    const objCreator = { key: chatName, id: Date.now(), user_name: local?.user, rank: "Creator" };

    useEffect(() => {
        setTimeout(() => setShowConfetti(false), 15000);
        setTimeout(() => setTimer(false), 10000);
    }, []);

    const handleLogout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("auth");
        }
        router.push("/auth/login");
    };

    const handleJoinChat = () => {
        if (chatName.trim()) {
            router.push(`/chat?params=${encodeURIComponent(JSON.stringify(objParticipant))}`);
            setModalOpen(false);
        }
    };

    const handleRoute = () => {
        setModalOpen(true);
    };

    
    const handleCreateChat = () => {
        if (chatName.trim()) {
            router.push(`/chat?params=${encodeURIComponent(JSON.stringify(objCreator))}`);
            setModalOpen2(false);
        }
    };

    return (
        <motion.div
            className={scss.home}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
                {showConfetti && (
                <Confetti
                    style={{
                        opacity: !timer ? "0" : "1",
                        transition: "0.6s ease-in-out",
                    }}
                    width={window.innerWidth}
                    height={window.innerHeight}
                    numberOfPieces={200}
                />
            )}
            <motion.h1
                className={scss.welcomeText}
                initial={{ y: -50 }}
                animate={{
                    y: [0, -1, 0, 1, 0],
                    rotate: [0, 1, 0, -1, 0],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                Добро пожаловать!!!
            </motion.h1>
            <motion.p
                className={scss.description}
                initial={{ x: -10 }}
                animate={{
                    x: 0,
                    y: [0, -2, 0, 2, 0],
                }}
                transition={{
                    duration: 1.2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
            >
                Это ваш удобный чат для общения с друзьями! Создавайте чаты, приглашайте друзей и наслаждайтесь беседой!
            </motion.p>
            <div className={scss.buttons}>
                <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                        rotate: [360],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    onClick={handleRoute}
                >
                    Войти в чат
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    animate={{
                        rotate: [0, 5, -5, 0],
                        y: [0, -4, 0, 4, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    onClick={() => setModalOpen2(true)}
                >
                    Создать чат
                </motion.button>
            </div>
            <motion.button
                className={scss.logout}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLogout}
                animate={{
                    rotate: [0, 10, 0, -10, 0],
                    y: [0, -4, 0, 4, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                Выйти
            </motion.button>
            {modalOpen   && (
                <div className={scss.modalOverlay} onClick={() => setModalOpen(false)}>
                    <motion.div
                        className={scss.modal}
                        onClick={(e) => e.stopPropagation()}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <AiOutlineClose className={scss.closeIcon} onClick={() => setModalOpen(false)} />
                        <h2>{modalOpen ? "Напишите сюда название чата" : "Придумайте название чату"}</h2>
                        <input
                            type="text"
                            value={chatName}
                            onChange={(e) => setChatName(e.target.value)}
                            placeholder="Название чата"
                        />
                        <button onClick={modalOpen ? handleJoinChat : handleCreateChat}>{modalOpen ? "Вступить в чат" : "Создать чат"}</button>
                    </motion.div>
                </div>
            )}
            {modalOpen2  && (
                <div className={scss.modalOverlay} onClick={() => setModalOpen2(false)}>
                    <motion.div
                        className={scss.modal}
                        onClick={(e) => e.stopPropagation()}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <AiOutlineClose className={scss.closeIcon} onClick={() => setModalOpen2(false)} />
                        <h2>{modalOpen ? "Напишите сюда название чата" : "Придумайте название чату"}</h2>
                        <input
                            type="text"
                            value={chatName}
                            onChange={(e) => setChatName(e.target.value)}
                            placeholder="Название чата"
                        />
                        <button onClick={modalOpen ? handleJoinChat : handleCreateChat}>{modalOpen ? "Вступить в чат" : "Создать чат"}</button>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
};

export default Home;
