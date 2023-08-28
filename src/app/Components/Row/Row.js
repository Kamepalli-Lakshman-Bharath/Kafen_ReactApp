import styles from "./Row.module.css";
const Row = (props) => {
  const { id, customer, date, amount, status, time } = props;
  const { productName, productBrand, expiryDate, unitPrice, stock } = props;
  const { userDp, fullName, dob, currentLocation, gender } = props;
  const { page } = props;
  return page === "orders" ? (
    <tr className={styles.row}>
      <td className={styles.textLightClr}>{id}</td>
      <td>{customer}</td>
      <td>
        {date} <br /> <span className={styles.textLightClr}>{time}</span>
      </td>
      <td>{amount}</td>
      <td className={styles.textLightClr}>{status}</td>
    </tr>
  ) : page === "products" ? (
    <tr className={styles.row}>
      <td className={styles.textLightClr}>{id}</td>
      <td>{productName}</td>
      <td>{productBrand}</td>
      <td>{expiryDate}</td>
      <td className={styles.textLightClr}>{unitPrice}</td>
      <td>{stock}</td>
    </tr>
  ) : (
    <tr className={styles.row}>
      <td className={styles.textLightClr}>{id}</td>
      <td><img src={userDp} alt='userDP' /> </td>
      <td>{fullName}</td>
      <td>{dob}</td>
      <td className={styles.textLightClr}>{gender}</td>
      <td>{currentLocation}</td>
    </tr>
  );
};
export default Row;
