
import logo from "@/assets/logo.png"
import Link from "next/link";
import styles from "./header.module.css";
import Image from "next/image";
import MainHeaderBg from "@/components/main-header-bg";
import NavLink from "@/components/nav-link";

export default function MainHeader() {

    return <>
        <MainHeaderBg/>
        <header className={styles.header}>

            <Link href="/" className={styles.logo}>
                <Image src={logo.src} alt="logo" width={100} height={100} priority/>
                NextLevel Food
            </Link>
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <NavLink href="/meals">Explore Meals</NavLink>
                    </li>
                    <li>
                        <NavLink href="/community">Community</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    </>
}