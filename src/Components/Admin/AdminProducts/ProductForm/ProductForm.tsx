import { ChangeEvent, FormEvent, useState } from "react";
import classes from "./ProductForm.module.css";
import { AdminProduct, ProductFormError } from "../../../../types";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/redux-store";
import { setNofication } from "../../../../Util/notification";
import { addNewProduct } from "../../../../store/admin-thunks";

interface Props {
  product?: AdminProduct;
}

export default function ProductForm(props: Props) {
  const navigate = useNavigate();

  const products = useSelector((state: RootState) => state.admin.products);

  const [id] = useState<number>(
    props.product ? props.product?.id : products.length + 1
  );
  const [title, setTitle] = useState<string>(
    props.product ? props.product.title : ""
  );
  const [description, setDescription] = useState<string>(
    props.product ? props.product.description : ""
  );
  const [stock, setStock] = useState<number>(
    props.product ? props.product.stock : 0
  );
  const [price, setPrice] = useState<number>(
    props.product ? props.product.price : 0
  );
  const [rating, setRating] = useState<number>(
    props.product ? props.product.rating.rate : 0
  );
  const [rateCount, setRateCount] = useState<number>(
    props.product ? props.product.rating.count : 0
  );
  const [category, setCategory] = useState(
    props.product ? props.product.category : "none"
  );
  const [image, setImage] = useState(props.product ? props.product.image : "");

  const titleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const descChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };
  const ratingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
  };
  const rateCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRateCount(Number(e.target.value));
  };
  const stockChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStock(Number(e.target.value));
  };
  const priceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };

  const imageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.value);
  };

  const dispatch = useDispatch<AppDispatch>();

  const [productFormError, setProductFormError] = useState<ProductFormError>({
    category: null,
    id: null,
    description: null,
    image: null,
    price: null,
    rate: null,
    count: null,
    stock: null,
    title: null,
  });

  const saveChangesHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      title.length === 0 ||
      title.length < 12 ||
      description === "" ||
      description.length < 120 ||
      image === "" ||
      image.length < 8 ||
      category === "none" ||
      category === "" ||
      (category !== "electronics" &&
        category !== "men's clothing" &&
        category !== "women's clothing" &&
        category !== "jewelery") ||
      price <= 0 ||
      rating < 0 ||
      rating > 5 ||
      rateCount < 0 ||
      stock < 0
    ) {
      if (title.length === 0 || title.length < 12) {
        setNofication("error", "Please enter a valid Title.");
        setProductFormError((prevState) => ({
          ...prevState,
          title: "Please enter a valid Title. (min 8 characters)",
        }));
      } else {
        setProductFormError((prevState) => ({
          ...prevState,
          title: null,
        }));
      }
      if (description === "" || description.length < 120) {
        setNofication("error", "Please enter a valid description.");
        setProductFormError((prevState) => ({
          ...prevState,
          description: "Please enter a valid description. (min 120 characters)",
        }));
      } else {
        setProductFormError((prevState) => ({
          ...prevState,
          description: null,
        }));
      }
      if (image === "" || image.length < 8) {
        setNofication("error", "Please enter valid image URL.");
        setProductFormError((prevState) => ({
          ...prevState,
          image: "Please enter valid image URL.",
        }));
      } else {
        setProductFormError((prevState) => ({
          ...prevState,
          image: null,
        }));
      }
      if (
        category === "none" ||
        category === "" ||
        (category !== "electronics" &&
          category !== "men's clothing" &&
          category !== "women's clothing" &&
          category !== "jewelery")
      ) {
        setNofication("error", "Please enter a valid category.");
        setProductFormError((prevState) => ({
          ...prevState,
          category: "Please enter a valid category.",
        }));
      } else {
        setProductFormError((prevState) => ({
          ...prevState,
          category: null,
        }));
      }
      if (price <= 0) {
        setNofication("error", "Please enter valid price.");
        setProductFormError((prevState) => ({
          ...prevState,
          price: "Please enter valid price.",
        }));
      } else {
        setProductFormError((prevState) => ({
          ...prevState,
          price: null,
        }));
      }
      if (rating < 0 || rating > 5) {
        setNofication("error", "Please enter valid rating.");
        setProductFormError((prevState) => ({
          ...prevState,
          price: "Please enter valid rating (1-5).",
        }));
      } else {
        setProductFormError((prevState) => ({
          ...prevState,
          price: null,
        }));
      }
      if (rateCount < 0) {
        setNofication("error", "Please enter valid review count.");
        setProductFormError((prevState) => ({
          ...prevState,
          count: "Please enter valid review count. (if none, enter 0)",
        }));
      } else {
        setProductFormError((prevState) => ({
          ...prevState,
          count: null,
        }));
      }
      if (stock < 0) {
        setNofication("error", "Please enter valid stock.");
        setProductFormError((prevState) => ({
          ...prevState,
          stock: "Please enter valid stock. (if none, enter 0)",
        }));
      } else {
        setProductFormError((prevState) => ({
          ...prevState,
          stock: null,
        }));
      }
    } else {
      const newProduct: AdminProduct = {
        id,
        category,
        description,
        image,
        price,
        rating: {
          rate: rating,
          count: rateCount,
        },
        stock,
        title,
      };
      dispatch(addNewProduct(newProduct, props.product ? "edit" : "new"));
      navigate("/admin/products", { replace: true }); //navigating will automatically clear all the fields
    }
  };

  const onCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  return (
    <form onSubmit={saveChangesHandler}>
      <fieldset className={classes.fieldset}>
        <label className={classes.label} htmlFor="id">
          Product Id
        </label>
        <input
          className={classes.input}
          type="number"
          name="id"
          id="id"
          value={id}
          readOnly
        />
        {productFormError.id && (
          <p className={classes.red}>{productFormError.id}</p>
        )}
      </fieldset>
      <fieldset className={classes.fieldset}>
        <label className={classes.label} htmlFor="title">
          Product Title
        </label>
        <input
          className={classes.input}
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={titleChange}
        />
        {productFormError.title && (
          <p className={classes.red}>{productFormError.title}</p>
        )}
      </fieldset>
      <fieldset className={classes.fieldset}>
        <label className={classes.label} htmlFor="description">
          Product Description
        </label>
        <textarea
          className={classes.textarea}
          rows={8}
          name="description"
          id="description"
          value={description}
          onChange={descChange}
        />
        {productFormError.description && (
          <p className={classes.red}>{productFormError.description}</p>
        )}
      </fieldset>
      <fieldset className={classes.fieldset}>
        <label className={classes.label} htmlFor="stock">
          Stock Count
        </label>
        <input
          className={classes.input}
          type="number"
          name="stock"
          id="stock"
          value={stock}
          onChange={stockChange}
        />
        {productFormError.stock && (
          <p className={classes.red}>{productFormError.stock}</p>
        )}
      </fieldset>
      <fieldset className={classes.fieldset}>
        <label className={classes.label} htmlFor="id">
          Price ($)
        </label>
        <input
          className={classes.input}
          type="number"
          name="price"
          min={1}
          step={0.01}
          id="price"
          value={price}
          onChange={priceChange}
        />
        {productFormError.price && (
          <p className={classes.red}>{productFormError.price}</p>
        )}
      </fieldset>
      <fieldset className={classes.fieldset}>
        <label className={classes.label} htmlFor="rating">
          Rating (0-5)
        </label>
        <input
          className={classes.input}
          type="number"
          name="rating"
          id="rating"
          step={0.01}
          min={0}
          max={5}
          value={rating}
          onChange={ratingChange}
        />
        {productFormError.rate && (
          <p className={classes.red}>{productFormError.rate}</p>
        )}
      </fieldset>
      <fieldset className={classes.fieldset}>
        <label className={classes.label} htmlFor="rateCount">
          Review Count
        </label>
        <input
          className={classes.input}
          type="number"
          name="rateCount"
          id="rateCount"
          min={0}
          value={rateCount}
          onChange={rateCountChange}
        />
        {productFormError.count && (
          <p className={classes.red}>{productFormError.count}</p>
        )}
      </fieldset>
      <fieldset className={classes.fieldset}>
        <label className={classes.label} htmlFor="image">
          Product Image URL
        </label>
        <input
          className={classes.input}
          type="url"
          size={50}
          name="image"
          id="image"
          value={image}
          onChange={imageChange}
        />
        {productFormError.image && (
          <p className={classes.red}>{productFormError.image}</p>
        )}
      </fieldset>
      <fieldset className={classes.fieldset}>
        <label className={classes.label} htmlFor="category">
          Select Category
        </label>
        <select
          className={classes.input}
          name="category"
          id="category"
          value={category}
          onChange={onCategoryChange}
        >
          {!props.product && <option value="none"></option>}
          <option value="electronics">electronics</option>
          <option value="jewelery">jewelery</option>
          <option value="men's clothing">men's clothing</option>
          <option value="women's clothing">women's clothing</option>
        </select>
        {productFormError.category && (
          <p className={classes.red}>{productFormError.category}</p>
        )}
      </fieldset>
      <button type="submit" className={classes.submitBtn}>
        {props.product ? "Save Changes" : "Add Product"}
      </button>
    </form>
  );
}
