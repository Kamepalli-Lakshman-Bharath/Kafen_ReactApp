"use client";

import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import styles from "../routes.module.css";
import Row from "../../Components/Row/Row";

const { useEffect, useState } = require("react");

const Products = () => {
  const [productsAvailable, setProductsAvailable] = useState([]);
  const [expiredProducts, setExpiredProducts] = useState([]);
  const [lowStackProducts, setLowStackProducts] = useState([]);

  const isExpired = (date) => {
    const dateParts = date.split("-");
    const day = parseInt(dateParts[0]);
    const monthAbbreviation = dateParts[1];
    const year = parseInt(dateParts[2]);

    const monthAbbreviations = {
      Jan: 1,
      Feb: 2,
      Mar: 3,
      Apr: 4,
      May: 5,
      Jun: 6,
      Jul: 7,
      Aug: 8,
      Sep: 9,
      Oct: 10,
      Nov: 11,
      Dec: 12,
    };
    const month = monthAbbreviations[monthAbbreviation];
    const dateToCheck = new Date(year, month, day);
    const currentDate = new Date();

    return dateToCheck < currentDate;
  };

  const handleFilters = (e, filterBy) => {
    const { checked } = e.target;
    if (filterBy === "expired") {
      if (checked) {
        setProductsAvailable([...expiredProducts, ...productsAvailable]);
      } else {
        let notExpired = productsAvailable.filter(
          (prod) => !isExpired(prod.expiryDate)
        );
        setProductsAvailable(notExpired);
      }
    } else {
      if (checked) {
        setProductsAvailable([...lowStackProducts, ...productsAvailable]);
      } else {
        let notLowStock = productsAvailable.filter((prod) => prod.stock >= 100);
        setProductsAvailable(notLowStock);
      }
    }
  };

  useEffect(() => {
    axios
      .get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products")
      .then((res) => {
        const availProd = res.data.filter(
          (item) => !isExpired(item.expiryDate) && item.stock >= 100
        );

        const expiredProd = res.data.filter((item) =>
          isExpired(item.expiryDate)
        );
        const lowStockprod = res.data.filter((item) => item.stock < 100);
        setProductsAvailable(availProd);
        setExpiredProducts(expiredProd);
        setLowStackProducts(lowStockprod);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      <Navbar  isOnline={true} />
      <h1 className={styles.heading}>Products</h1>
      <div className={styles.container}>
        <div className={styles.left}>
          <p className={styles.leftHeading}>Filters</p>
          <p className={styles.count}>Count:{productsAvailable.length}</p>
          <div className={styles.filters}>
            <label>
              <input
                onChange={(e) => handleFilters(e, "expired")}
                type="checkbox"
              />
              Expired
            </label>
            <br />
            <label>
              <input
                onChange={(e) => handleFilters(e, "lowStack")}
                type="checkbox"
              />
              Low Stack
            </label>
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeading}>
              <th>ID</th>
              <th>Product Name</th>
              <th>Product Brand</th>
              <th>ExpiryDate</th>
              <th>Unit Price</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {productsAvailable.length > 0 &&
              productsAvailable.map((item) => (
                <Row
                  page="products"
                  key={item.id}
                  id={item.id}
                  productName={item.medicineName}
                  productBrand={item.medicineBrand}
                  expiryDate={item.expiryDate}
                  unitPrice={item.unitPrice}
                  stock={item.stock}
                />
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};
export default Products;
