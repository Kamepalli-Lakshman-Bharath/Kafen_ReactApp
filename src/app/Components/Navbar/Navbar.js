"use client";
import { useRouter } from "next/navigation";
import styles from "./Navbar.module.css";

const Navbar = ({ isOnline }) => {
  const { push } = useRouter();
  const handleRoutes = (page) => {
    if (isOnline) {
      push(`./${page}`)
    }
    else{
      alert('Please enter the user name and password')
    }
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img
          className={styles.imgLogo}
          src="https://edu-web-fundamentals.web.app/static/media/logo.58169365.png"
          alt="Logo"
        />
        <p className={styles.logoText}>Kafene</p>
      </div>
      <div className={styles.menu}>
        <p onClick={() => handleRoutes("orders")}>Orders</p>
        <p onClick={() => handleRoutes("products")}>Products</p>
        <p onClick={() => handleRoutes("users")}>Users</p>
      </div>
      {isOnline && (
        <p onClick={() => push("/")} className={styles.logOut}>
          LogOut
        </p>
      )}
    </nav>
  );
};
export default Navbar;
