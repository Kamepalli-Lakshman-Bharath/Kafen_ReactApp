"use client";

import axios from "axios";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "../routes.module.css";
import { useEffect, useMemo, useState } from "react";
import Row from "../../Components/Row/Row";

const Orders = () => {
  const [ordersData, setOrdersData] = useState([]);
  const [filterChecked, setFilterChecked] = useState({
    New: false,
    Packed: false,
    Delivered: false,
    InTransit: false,
  });
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    axios
      .get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders")
      .then((res) => {
        setOrdersData(res.data);
      })
      .catch((err) => console.log("Error:", err));
  }, []);

  useMemo(() => {
    //filtering the Checked filters
    const checked = Object.entries(filterChecked).filter(
      ([key, value]) => value === true
    );
    // filtering the orders Data
    let filOrders = [];
    checked.forEach(([key, value]) => {
      let filOrders2 = ordersData.filter((order) => order.orderStatus === key);
      filOrders.push(...filOrders2);
    });
    setFilteredOrders(filOrders);
  }, [filterChecked]);

  const handleFilters = (e, filterBy) => {
    const { checked } = e.target;
    setFilterChecked({ ...filterChecked, [filterBy]: checked });
  };
  return (
    <main>
      <Navbar isOnline={true} />
      <h1 className={styles.heading}>Orders</h1>
      <div className={styles.container}>
        <div className={styles.left}>
          <p className={styles.leftHeading}>Filters</p>
          <p className={styles.count}>
            Count:
            {filteredOrders.length > 0
              ? filteredOrders.length
              : ordersData.length}
          </p>
          <div className={styles.filters}>
            <label>
              <input
                onChange={(e) => handleFilters(e, "New")}
                type="checkbox"
              />
              New
            </label>
            <br />
            <label>
              <input
                onChange={(e) => handleFilters(e, "Packed")}
                type="checkbox"
              />
              Packed
            </label>
            <br />
            <label>
              <input
                onChange={(e) => handleFilters(e, "InTransit")}
                type="checkbox"
              />
              InTransit
            </label>
            <br />
            <label>
              <input
                onChange={(e) => handleFilters(e, "Delivered")}
                type="checkbox"
              />
              Delivered
            </label>
            <br />
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeading}>
              <th>ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {!filteredOrders.length > 0
              ? ordersData.map((item) => (
                  <Row
                  page='orders'
                    id={item.id}
                    customer={item.customerName}
                    date={item.orderDate}
                    amount={item.amount}
                    status={item.orderStatus}
                    time={item.orderTime}
                    key={item.id}
                  />
                ))
              : filteredOrders.map((item) => (
                  <Row
                  page='orders'
                    id={item.id}
                    customer={item.customerName}
                    date={item.orderDate}
                    amount={item.amount}
                    status={item.orderStatus}
                    time={item.orderTime}
                    key={item.id}
                  />
                ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};
export default Orders;
