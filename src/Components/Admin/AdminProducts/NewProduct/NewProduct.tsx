import ProductForm from "../ProductForm/ProductForm";
import classes from "./NewProduct.module.css";

export default function NewProduct() {
  return (
    <div>
      <h1 className={classes.heading}>
        Add a <span className={classes.red}>New</span> Product
      </h1>
      <div className={classes.formContainer}>
        <ProductForm />
      </div>
    </div>
  );
}
