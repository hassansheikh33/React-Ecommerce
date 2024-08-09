import classes from "./ContactUs.module.css";

export default function ContactUs() {
  return (
    <div className={classes.container}>
      <h1>Contact Us</h1>
      <div className={classes.formContainer}>
        <form className={classes.form}>
          <label htmlFor="name" className={classes.label}>
            Your Name :
          </label>
          <input
            type="email"
            id="name"
            required
            className={classes.nameInput}
          />
          <label htmlFor="email" className={classes.label}>
            Email :
          </label>
          <input
            type="email"
            id="email"
            placeholder="eg: abc@gmail.com"
            className={classes.emailInput}
          />
          <label htmlFor="inquiry" className={classes.label}>
            Your Inquiry :
          </label>
          <textarea name="inquiry" id="inquiry"></textarea>
          <button className={classes.submit}>Submit Inquiry</button>
        </form>
      </div>
    </div>
  );
}
