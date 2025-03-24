import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo1.svg";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <img className={styles.logo} src={logo} alt="logo" />
      
      <button 
        className={`${styles.hamburger} ${menuOpen ? styles.active : ""}`} 
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
        <span className={styles.hamburgerLine}></span>
      </button>
      
      <div className={`${styles.navMenu} ${menuOpen ? styles.active : ""}`}>
        <div className={styles.categories}>
          <Link to="/" className={styles.navLink} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/meal-planner" className={styles.navLink} onClick={() => setMenuOpen(false)}>Meal Planner</Link>
          <Link to="/grocery-deals" className={styles.navLink} onClick={() => setMenuOpen(false)}>Grocery Deals</Link>
        </div>
        
        <div className={styles.loginBtn}>
          <Link to="/shopping-list" className={styles.shoppingListBtn} onClick={() => setMenuOpen(false)}>Shopping List</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;