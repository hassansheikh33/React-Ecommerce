import Card from "../Card/Card";
import classes from "./Home.module.css";
import qualitySvg from "../../assets/quality.svg";
import carSvg from "../../assets/car.svg";
import minimalistic from "../../assets/minimalistic.svg";
import atm from "../../assets/atm.svg";
import theJournal from "../../assets/theJournal.png";
import restockingImage from "../../assets/restocking.jpg";
import storeImage from "../../assets/store.jpg";
import BrowseCategory from "../BrowseCategory/BrowseCategory";
// import Carousel from "../Carousel/Carousel";

// const carouselImageURLs = [
//   "https://via.placeholder.com/800x400/ff5733/fff",
//   "https://via.placeholder.com/800x400/33ff57/fff",
//   "https://via.placeholder.com/800x400/5733ff/fff",
// ];

const cards = [
  {
    heading: "Minimalistic Designs",
    text: "visually appealing desings bringing coldness to eyes",
    backColor: "rgb(248, 227, 213)",
    svg: minimalistic,
  },
  {
    heading: "Premium Quality",
    text: "Premium Quality of products ensure customer satisfaction",
    backColor: "rgb(206, 235, 233)",
    svg: qualitySvg,
  },
  {
    heading: "Secure payments",
    text: "Secure Payment methods available for payments",
    backColor: "rgb(226, 242, 178)",
    svg: atm,
  },
  {
    heading: "FREE Shipping",
    text: "Free is good, Free shipping Worldwide!",
    backColor: "rgb(214, 229, 251)",
    svg: carSvg,
  },
];

export default function Home() {
  return (
    <div className={classes.homeContainer}>
      {/* <Carousel images={carouselImageURLs}></Carousel> */}
      <div className={classes.textContainer}>
        <h1>Welcome to Our Store</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus dignissimos magni libero aliquam consectetur ullam
          expedita voluptates illo fugit nam architecto quaerat neque, obcaecati
          ea Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam,
          at.
        </p>
      </div>
      <article className={classes.cardArticle}>
        <h2>Why Choose Us?</h2>
        <div className={classes.cardContainer}>
          {cards.map((card, index) => {
            return (
              <Card
                key={index}
                className={classes.card}
                style={{ backgroundColor: card.backColor }}
              >
                <div className={classes.svgContainer}>
                  <img
                    src={card.svg}
                    alt={card.heading}
                    className={classes.svg}
                  />
                </div>
                <h3>{card.heading}</h3>
                <p>{card.text}</p>
              </Card>
            );
          })}
        </div>
      </article>
      <BrowseCategory title="Browse Categories" />
      <section className={classes.journal}>
        <div className={classes.left}>
          <img
            src={theJournal}
            alt="the Journal image"
            className={classes.image}
          />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            dignissimos placeat, itaque non laboriosam esse maxime doloremque.
            Quo cupiditate repellat nostrum
          </p>
          <button className={classes.journalBtn}>Read Our Journal!</button>
        </div>
        <div className={classes.middle}>
          <img
            className={classes.image}
            src={restockingImage}
            alt="picture of us re-stocking"
          />
          <p className={classes.imageCaption}>
            <span className={classes.read}>Read: </span>
            We re-stock every weekend!
          </p>
        </div>
        <div className={classes.right}>
          <img
            className={classes.image}
            src={storeImage}
            alt="clothing store"
          />
          <p className={classes.imageCaption}>
            <span className={classes.read}>Read: </span>
            Winter stock clearance sale!
          </p>
        </div>
      </section>
    </div>
  );
}
