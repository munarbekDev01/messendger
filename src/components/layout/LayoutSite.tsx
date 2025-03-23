"use client";
import { FC, ReactNode, useEffect } from "react";
import scss from "./LayoutSite.module.scss";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { usePathname, useRouter } from "next/navigation";

interface ILayoutSiteProps {
    children: ReactNode;
}

const LayoutSite: FC<ILayoutSiteProps> = ({ children }) => {
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        const metaTag = document.querySelector("meta[name='viewport']");
        if (metaTag) {
            metaTag.setAttribute(
                "content",
                "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
            );
        }
    }, [pathName]);

    useEffect(() => {
        if (typeof window !== "undefined" && pathName !== "/auth/login" && pathName !== "/auth/register") {
            const auth = localStorage.getItem("auth");
            if (!auth) {
                router.push("/auth/register");
            }
        }
    }, [pathName, router]);

    return (
        <div className={scss.LayoutSite}>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default LayoutSite;
