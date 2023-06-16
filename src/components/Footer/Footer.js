import classes from "./Footer.module.scss";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";
import { GoLocation } from "react-icons/go";

const Footer = (props) => {
  return (
    <section className={classes["footer-section"]}>
      <div className={classes["upper-section"]}>
        <div className={classes["first-section"]}>
          <div className={classes.actions}>
            <p>find a store</p>
            <p>become a member</p>
            <p>sign up for email</p>
            <p>student discounts</p>
            <p>send us feedback</p>
          </div>
          <div className={classes["get-help"]}>
            <p>
              <span>get help</span>
            </p>
            <p>order status</p>
            <p>delivery</p>
            <p>returns</p>
            <p>payment options</p>
            <p>contact us</p>
          </div>
          <div className={classes.about}>
            <p>
              <span>about nike</span>
            </p>
            <p>news</p>
            <p>careers</p>
            <p>investors</p>
            <p>sustainability</p>
          </div>
        </div>
        <div className={classes["second-section"]}>
          <div className={classes["soc-meds"]}>
            <h1>
              <BsInstagram />
            </h1>
            <h1>
              <BsFacebook />
            </h1>
            <h1>
              <BsTwitter />
            </h1>
          </div>
        </div>
      </div>
      <div className={classes["lower-section"]}>
        <div className={classes.location}>
          <p>
            <GoLocation />
          </p>
          <p>philippines</p>
        </div>
        <div className={classes.credits}>
          <p>© 2023 Nike, Inc. All Rights Reserved.</p>
        </div>
      </div>
      <div className={classes.message}>
        <p>
          <span>*</span> The design and everything that contain of this website
          are property of Nike brand. This was created not to copy and commit
          piracy. This is practice website only. To hone and practice the skills
          of the creator in web development. <span>*</span>
        </p>
      </div>
    </section>
  );
};

export default Footer;
