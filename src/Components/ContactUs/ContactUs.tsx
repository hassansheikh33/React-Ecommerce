import { useRef, useState } from "react";
import Button from "../UI/Button/Button";
import SocialLinks from "../UI/SocialLinks/SocialLinks";
import classes from "./ContactUs.module.css";
import { useNavigate } from "react-router-dom";
import { ContactFormError } from "../../types";
import { setNofication } from "../../Util/notification";

export default function ContactUs() {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const inquiryRef = useRef<HTMLTextAreaElement>(null);
  const [contactError, setContactError] = useState<ContactFormError>({
    name: null,
    email: null,
    query: null,
  });

  const navigate = useNavigate();

  const submisstionHandler = () => {
    if (
      nameInputRef.current?.value !== "" &&
      nameInputRef.current?.value.includes(" ") &&
      emailInputRef.current?.value !== "" &&
      emailInputRef.current?.value.includes("@") &&
      emailInputRef.current?.value.endsWith(".com") &&
      inquiryRef.current?.value !== "" &&
      inquiryRef.current?.value.length &&
      inquiryRef.current?.value.length >= 15
    ) {
      setNofication("success", "Query sent, Our team will contact you soon!");
      navigate("/", { replace: true });
    } else {
      if (
        nameInputRef.current?.value === "" ||
        !nameInputRef.current?.value.includes(" ")
      ) {
        setContactError((prevState) => ({
          ...prevState,
          name: "Please enter your valid full name. eg: John Doe",
        }));
      } else {
        setContactError((prevState) => ({
          ...prevState,
          name: null,
        }));
      }
      if (
        emailInputRef.current?.value === "" ||
        !emailInputRef.current?.value.includes("@") ||
        !emailInputRef.current?.value.endsWith(".com")
      ) {
        setContactError((prevState) => ({
          ...prevState,
          email: "Plese enter a valid email. eg: abc@gmail.com",
        }));
      } else {
        setContactError((prevState) => ({
          ...prevState,
          email: null,
        }));
      }
      if (
        inquiryRef.current?.value !== "" ||
        inquiryRef.current.value.length < 15
      ) {
        setContactError((prevState) => ({
          ...prevState,
          query: "Please elaborate your query descriptively",
        }));
      } else {
        setContactError((prevState) => ({ ...prevState, query: null }));
      }
    }
  };
  return (
    <div className={classes.contactUs}>
      <h1 className={`${classes.center} ${classes.heading}`}>
        <span className={classes.red}>Contact</span> Us
      </h1>
      <div className={classes.container}>
        <div className={classes.textContainer}>
          <h2>
            <span className={classes.red}>Contact</span> Info
          </h2>
          <div className={classes.ContactInfo}>
            <svg
              className={`${classes.icon} ${classes.location}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            <p>Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi 96522</p>
          </div>
          <div className={classes.ContactInfo}>
            <svg
              className={classes.icon}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              ></path>
            </svg>
            <p>+(257) 563-7401</p>
          </div>
          <div className={classes.ContactInfo}>
            <svg
              className={classes.icon}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
            <p>abc@pumaLanga.com</p>
          </div>
          <h2>
            Social <span className={classes.red}>Links</span>
          </h2>
          <SocialLinks />
        </div>
        <div className={classes.formContainer}>
          <h2 className={classes.center}>
            Have a <span className={classes.blue}>Query</span>?
          </h2>
          <form className={classes.form}>
            <div className={classes.field}>
              <label htmlFor="name" className={classes.label}>
                Your Name :
              </label>
              <input
                ref={nameInputRef}
                type="email"
                id="name"
                required
                placeholder="eg: John Doe"
                className={classes.input}
              />
              {contactError.name && (
                <p className={classes.red}>{contactError.name}</p>
              )}
            </div>
            <div className={classes.field}>
              <label htmlFor="email" className={classes.label}>
                Email :
              </label>
              <input
                ref={emailInputRef}
                type="email"
                id="email"
                required
                placeholder="eg: abc@gmail.com"
                className={classes.input}
              />
              {contactError.email && (
                <p className={classes.red}>{contactError.email}</p>
              )}
            </div>
            <div className={classes.field}>
              <label htmlFor="inquiry" className={classes.label}>
                Your Inquiry :
              </label>
              <textarea
                className={classes.textarea}
                ref={inquiryRef}
                name="inquiry"
                id="inquiry"
                rows={8}
              ></textarea>
              {contactError.query && (
                <p className={classes.red}>{contactError.query}</p>
              )}
            </div>
            <div className={classes.field}>
              <Button className={classes.inquiry} onClick={submisstionHandler}>
                Send Inquiry
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
