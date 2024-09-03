import { Helmet } from "react-helmet";
import ContactUs from "../Components/ContactUs/ContactUs";

export default function ContactUsPage() {
  return (
    <>
      <Helmet>
        <title>Contact Us</title>
        <meta
          name="description"
          content="Contact us for any queries related to products, orders, or collaboration!"
        />
      </Helmet>
      <ContactUs />;
    </>
  );
}
