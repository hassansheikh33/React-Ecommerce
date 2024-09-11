import classes from "./AllAdminProducts.module.css";
import { Link, Outlet } from "react-router-dom";
import Card from "../../../UI/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/redux-store";
import { deleteProduct } from "../../../../store/admin-thunks";
import Button from "../../../UI/Button/Button";
import { useState } from "react";
import Modal from "../../../UI/Modal/Modal";

export default function AllAdminProducts() {
  const products = useSelector((state: RootState) => state.admin.products);
  const loading = useSelector((state: RootState) => state.ui.loading);
  const dispatch = useDispatch<AppDispatch>();
  const [deleteId, setDeleteId] = useState<string>("");
  const [modal, setModal] = useState<"delete" | null>(null);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const showConfirmModal = (id: string) => {
    setDeleteId(id);
    setModal("delete");
  };

  const delProductHandler = () => {
    if (deleteId !== "") {
      dispatch(deleteProduct(deleteId));
      closeHandler();
    }
  };

  const closeHandler = () => {
    setDeleteId("");
    setModal(null);
  };

  return (
    <div>
      {modal !== null && (
        <Modal onClose={closeHandler}>
          {modal === "delete" && (
            <form onSubmit={delProductHandler}>
              <div>
                <h3 className={classes.modalHeading}>
                  Are You sure You want to delete this product?
                </h3>
              </div>
              <div>
                <Button
                  className={classes.closeBtn}
                  type="button"
                  onClick={closeHandler}
                >
                  Close
                </Button>
                <Button className={classes.deleteProductBtn} type="submit">
                  Yes, Delete
                </Button>
              </div>
            </form>
          )}
        </Modal>
      )}
      <div className={classes.textDiv}>
        <h1 className={classes.heading}>
          All <span className={classes.blue}>Products</span>
        </h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam, nihil.
        </p>
      </div>
      <div className={classes.productContainer}>
        <Button className={`${classes.btn} ${classes.addProductBtn}`}>
          <Link className={classes.link} to="/admin/products/new">
            Add a new product ?
          </Link>
        </Button>
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
              <Button className={classes.editProductBtn}>
                <Link
                  to={`/admin/products/edit/${item.id}`}
                  className={classes.link}
                >
                  Edit Product
                </Link>
              </Button>
              <Button
                onClick={() => showConfirmModal(item.id.toString())}
                className={classes.deleteProductBtn}
              >
                Delete Product
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <Outlet />
    </div>
  );
}
