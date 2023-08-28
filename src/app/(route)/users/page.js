"use client";
import { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "../routes.module.css";
import axios from "axios";
import Row from "../../Components/Row/Row";

const Users = () => {
  const [searchName, setSearchName] = useState("");
  const [usersDetails, setUsersDetails] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleForm = (e) => {
    e.preventDefault();

    const isNameExist = (str) => {
      str = str.toLowerCase().split(" ");
      if (str[0].includes(searchName) || str[1].includes(searchName)) {
        return true;
      }
      return false;
    };

    const searchedPlayers = usersDetails.filter((item) =>
      isNameExist(item.fullName)
    );
    if (searchedPlayers.length === 0&&searchName.length >= 2) {
      alert("No results Found");
    }

    if (searchName.length < 2) {
      alert("Enter More than two characters");
    } else {
      setSearchResults(searchedPlayers);
    }

    e.target.reset();
  };
  useEffect(() => {
    axios
      .get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users")
      .then((res) => setUsersDetails(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      <Navbar isOnline={true} />
      <h1 className={styles.heading}> Users</h1>
      <form onSubmit={handleForm}>
        <input
          type="text"
          onChange={(e) => {
            setSearchName(e.target.value.toLowerCase());
          }}
          className={styles.searchBox}
        />
        <button className={styles.btn}>Submit</button>
      </form>
      <table style={{ margin: "30px 100px" }} className={styles.table}>
        <thead>
          <tr className={styles.tableHeading}>
            <th>ID</th>
            <th>UserAvatar</th>
            <th>FullName</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>CurrentLocation</th>
          </tr>
        </thead>
        <tbody>
          {!searchResults.length > 0
            ? usersDetails.map((item) => (
                <Row
                  key={item.id}
                  id={item.id}
                  userDp={item.profilePic}
                  fullName={item.fullName}
                  dob={item.dob}
                  currentLocation={item.currentCity}
                  gender={item.gender}
                />
              ))
            : searchResults.map((item) => (
                <Row
                  key={item.id}
                  id={item.id}
                  userDp={item.profilePic}
                  fullName={item.fullName}
                  dob={item.dob}
                  currentLocation={item.currentCity}
                  gender={item.gender}
                />
              ))}
        </tbody>
      </table>
    </main>
  );
};
export default Users;
