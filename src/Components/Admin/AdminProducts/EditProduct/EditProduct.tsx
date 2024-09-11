import { AdminProduct } from "../../../../types";
import ProductForm from "../ProductForm/ProductForm";
import classes from "./EditProduct.module.css";

export default function EditProduct({ product }: { product: AdminProduct }) {
  return (
    <div>
      <h2 className={classes.heading}>
        <span className={classes.blue}>Edit</span> Product
      </h2>
      <div className={classes.container}>
        <div className={classes.imageContainer}>
          <img
            className={classes.image}
            src={product.image}
            alt="Product Image"
          />
        </div>
        <div className={classes.formContainer}>
          <ProductForm product={product} />
        </div>
      </div>
    </div>
  );
}
