import classes from "./AllAdminProducts.module.css";
import { Link, Outlet } from "react-router-dom";
import Card from "../../../UI/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/redux-store";
import { deleteProduct } from "../../../../store/admin-thunks";

export default function AllAdminProducts() {
  const products = useSelector((state: RootState) => state.admin.products);
  const loading = useSelector((state: RootState) => state.ui.loading);
  const dispatch = useDispatch<AppDispatch>();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const delProductHandler = (id: string) => {
    const ok = confirm("Are you sure you want to delete this product?");
    if (ok) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div>
      <div className={classes.textDiv}>
        <h1 className={classes.heading}>
          All <span className={classes.blue}>Products</span>
        </h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam, nihil.
        </p>
        <button className={`${classes.btn} ${classes.addProductBtn}`}>
          <Link className={classes.link} to="/admin/products/new">
            Add a new product ?
          </Link>
        </button>
      </div>
      <div className={classes.productContainer}>
        {products.map((item) => (
          <Card key={item.id} className={classes.productCard}>
            <img
              className={classes.itemImage}
              src={item.image}
              alt="Item image"
            />
            <div className={`${classes.flex} ${classes.detailsDiv}`}>
              <h3>
                {item.title.slice(0, 40)}
                {item.title.length > 40 ? "..." : ""}
              </h3>
              <p>
                In stock:{" "}
                <span className={classes.stockCount}>{item.stock}</span>
              </p>
            </div>
            <div className={`${classes.flex} ${classes.btnsDiv}`}>
              <button className={`${classes.btn} ${classes.editProductBtn}`}>
                <Link
                  to={`/admin/products/edit/${item.id}`}
                  className={classes.link}
                >
                  Edit Product
                </Link>
              </button>
              <button
                onClick={() => delProductHandler(item.id.toString())}
                className={`${classes.btn} ${classes.deleteProductBtn}`}
              >
                Delete Product
              </button>
            </div>
          </Card>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
