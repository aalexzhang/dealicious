import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Footer.module.css";
import logo from "../assets/logo0.svg";
import facebookIcon from "../assets/facebook-icon.svg";
import twitterIcon from "../assets/twitter-icon.svg";
import youtubeIcon from "../assets/youtube-icon.svg";
import linkedinIcon from "../assets/linked-in-icon.svg";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>

        <div className={styles.footerLeft}>
          <img src={logo} alt="Dealicious Logo" className={styles.logo} />
          <div className={styles.socialMediaIcons}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={facebookIcon} alt="Facebook" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src={twitterIcon} alt="Twitter" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <img src={youtubeIcon} alt="YouTube" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
          </div>
        </div>

        <div className={styles.footerCenter}>
          <div className={styles.quickLinks}>Quick Links</div>
          <div className={styles.footerLinksContainer}>
            <Link to="/" className={styles.footerLink}>Home</Link>
            <Link to="/meal-planner" className={styles.footerLink}>Meal Planner</Link>
            <Link to="/grocery-deals" className={styles.footerLink}>Grocery Deal</Link>
          </div>
        </div>

        <div className={styles.footerRight}>
          <div className={styles.contactText}>We want to get to know you more!</div>
          <div className={styles.contactForm}>
            <input type="email" placeholder="Enter your Email" className={styles.emailInput} />
            <button className={styles.contactButton}>Contact Us</button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
