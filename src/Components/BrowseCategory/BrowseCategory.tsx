import { useNavigate } from "react-router-dom";
import classes from "./BrowseCategory.module.css";
import jeweleryImage from "../../assets/jewelery.jpg";
import womenClothing from "../../assets/womenClothing.jpg";
import electronicsImage from "../../assets/electronics.jpg";
import menClothing from "../../assets/menClothing.jpg";
const categories = [
  {
    name: "electronics",
    image: electronicsImage,
  },
  {
    name: "jewelery",
    image: jeweleryImage,
  },
  {
    name: "men's clothing",
    image: menClothing,
  },
  {
    name: "women's clothing",
    image: womenClothing,
  },
];

interface Props {
  title: string;
}

export default function BrowseCategory({ title }: Props) {
  const navigate = useNavigate();

  return (
    <div className={classes.browseCategories}>
      <h2>{title}</h2>
      <div className={classes.categoriesContainer}>
        {categories.map((category, index) => {
          return (
            <div key={index} className={classes.category}>
              <img
                className={classes.image}
                src={category.image}
                alt="category image"
                id="image"
                onClick={() => navigate(`/shop/category/${category.name}`)}
              />
              <p className={classes.categoryName}>{category.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
