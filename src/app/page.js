"use client";
import { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import styles from "./loginPage.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [userLogin, setUserLogin] = useState(false);
  const { push } = useRouter();

  // handeling the onSumbit event on form
  const handleLoginForm = (e) => {
    e.preventDefault();
    if (name !== password) {
      alert(`${name} and ${password} are not matching try again`);
      setUserLogin(false);
      e.target.reset();
    } else {
      setUserLogin(true);
      push("./orders");
    }
  };
  return (
    <main>
      <Navbar isOnline={userLogin} />
      <form className={styles.loginCard} onSubmit={handleLoginForm}>
        <h1 className={styles.heading}>Sign In</h1>
        <input
        required
          className={styles.inputBox}
          type="text"
          onChange={(e) => {
            setName(`${e.target.value}`);
          }}
          placeholder="Enter Username"
        />
        <br />
        <input
        required
          className={styles.inputBox}
          type="password"
          onChange={(e) => {
            setPassword(`${e.target.value}`);
          }}
          placeholder="Enter Password"
        />
        <br />
        <button className={styles.loginBtn} type="submit">
          Login
        </button>
      </form>
    </main>
  );
}
