import React, { useEffect, useRef } from 'react';
import '../style.css';

import pepperImage from '../assets/pepper-drops-into-water-10.png';
import mealPreviewCard from '../assets/meal-preview-card.mp4';
import steakPreview from '../assets/steak-preview0.png';
import groceryPreviewVideo from '../assets/grocery.mp4';
import ratingIcon from '../assets/rating0.svg';
import arrowLeft from '../assets/review-left-arrow0.svg';
import arrowRight from '../assets/review-left-arrow1.svg';

import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const totalSlides = 4;
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);
  const activeSlideRef = useRef(null);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? totalSlides - 1 : prevSlide - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === totalSlides - 1 ? 0 : prevSlide + 1));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      handlePrevSlide();
    } else if (e.key === 'ArrowRight') {
      handleNextSlide();
    }
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      handleNextSlide();
    }
    if (touchStart - touchEnd < -50) {
      handlePrevSlide();
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  useEffect(() => {
    document.title = "Dealicious - Home";
  }, []);
  
  useEffect(() => {
    const activeSlide = document.querySelector(`.review-slide.active`);
    if (activeSlide && activeSlideRef.current) {
      activeSlideRef.current.focus({ preventScroll: true });
    }
  }, [currentSlide]);

  return (
    <Layout>
      <div className="landing">
        <section className="hero-section" aria-labelledby="hero-title">
          <h1 className="hero-title" id="hero-title">
            ONLY THE BEST
            <br />
            FOR YOU
          </h1>
          <img
            className="pepper-drops-into-water-1"
            src={pepperImage}
            alt="Decorative background image of pepper drops into water"
          />
          <div className="hero-subtitle">
            <p className="body-text">
              Explore budget-friendly meal plans at Dealicious,
              <br />
              designed to nourish your body while fitting your lifestyle and goals.
            </p>
            <button className="cta-btn3">
              <Link to="/onboarding" className="body-text" aria-label="Get started with personalized meal planning">
                Get Started
              </Link>
            </button>
          </div>
        </section>

        <main id="main-content" className="content-section">
          <div className="seperator" role="separator" aria-hidden="true" />
          
          <section className="content-container-1" aria-labelledby="meal-planner-title">
            <div className="title-container">
              <span className="number" aria-hidden="true">01</span>
              <h2 className="h-1" id="meal-planner-title">Weekly Meal Planner</h2>
            </div>
            <p className="body-text">
              Plan affordable meals, track nutritional balance, and explore diverse
              cuisines effortlessly.
              <br />
              Stay organized while enjoying healthy, budget-friendly, and flavorful
              dishes.
            </p>
            <div className="card-container-1">
              <div className="left-card-container">
                <div className="card-1">
                  <h3 className="h-12">Budget</h3>
                  <p className="body-text">
                    Create cost-effective meal plans that minimize waste and make the
                    most of your grocery budget.
                  </p>
                </div>
                <div className="card-2">
                  <h3 className="h-12">Nutrition</h3>
                  <p className="body-text">
                    Enjoy well-balanced meals packed with essential nutrients to
                    support a healthy lifestyle.
                  </p>
                </div>
                <div className="card-3">
                  <h3 className="h-13">Cuisine</h3>
                  <p className="body-text">
                    Discover a variety of flavorful dishes inspired by different
                    cuisines to keep your meals exciting.
                  </p>
                </div>
              </div>
              <div className="meal-plan-preview">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  controls
                  className="meal-plan-video"
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '30px',
                    top: 0,
                    left: 0
                  }}
                  aria-label="Video preview of meal planning features"
                >
                  <source src={mealPreviewCard} type="video/mp4" />
                  <track kind="captions" src="../assets/captions/meal-preview-captions.vtt" label="English" />
                  Your browser does not support the video tag.
                </video>
                <div className="card-container-01-title">
                  <h3 className="h-14">
                    Check Out Your First Perfect Meal Plan at Dealicious
                  </h3>
                  <button className="cta-btn">
                    <Link to="meal-planner" className="body-text" aria-label="Explore meal planner">
                      Explore more
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="content-container-2" aria-labelledby="exclusive-deals-title">
            <div className="title-container">
              <span className="number" aria-hidden="true">02</span>
              <h2 className="h-1" id="exclusive-deals-title">Exclusive Deals</h2>
            </div>
            <p className="body-text">
              Access special discounts and limited-time offers on a variety of
              products and services.
              <br />
              Save more on your favorite brands while enjoying premium deals tailored
              to your needs.
            </p>
            <div className="card-container-2">
              <img className="steak-preview" src={steakPreview} alt="USDA Choice Ribeye Steak with marbling" />
              <div className="steak-container">
                <div className="steak-title-container">
                  <h3 className="h-1">USDA Choice Ribeye Steak</h3>
                  <div className="rating-container">
                    <img className="rating" src={ratingIcon} alt="5 star rating" />
                    <span className="body-text">5.0 (259 reviews)</span>
                  </div>
                  <div className="price-container">
                    <span className="price">$12.49</span>
                    <div className="sale-tag" role="text" aria-label="Sale price with 40 percent off">
                      <span className="sale-tag-text">40% off</span>
                    </div>
                  </div>
                </div>
                <p className="body-text">
                  Enjoy premium, tender, and juicy USDA Choice ribeye steak at an
                  unbeatable price. Perfect for grilling, pan-searing, or roasting,
                  this high-quality cut delivers rich flavor and exceptional marbling.
                </p>
                <Link to="/grocery-deals" className="cta-btn2">
                  <span className="body-text">Get shopping</span>
                </Link>
              </div>
            </div>
          </section>

          <section className="content-container-3" aria-labelledby="grocery-title">
            <div className="title-container">
              <span className="number" aria-hidden="true">03</span>
              <h2 className="h-1" id="grocery-title">Grocery With Exclusive Price</h2>
            </div>
            <p className="body-text">
              Get the best deals on fresh groceries with special discounts and
              member-only pricing.
              <br />
              Save more on everyday essentials while enjoying quality products at
              unbeatable prices.
            </p>
            <div className="card-container-3">
              <video 
                autoPlay 
                loop 
                muted 
                controls
                className="grocery-preview-video"
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '30px',
                  top: 0,
                  left: 0
                }}
                aria-label="Video preview of grocery shopping deals"
              >
                <source src={groceryPreviewVideo} type="video/mp4" />
                <track kind="captions" src="../assets/captions/grocery-preview-captions.vtt" label="English" />
                Your browser does not support the video tag.
              </video>
              <div className="card-container-03-title">
                <h3 className="h-14">
                  Grab Your Favorites Add to Cart Now Start Saving Today
                </h3>
                <button className="cta-btn">
                  <Link to="grocery-deals" className="body-text">Explore more</Link>
                </button>
              </div>
            </div>
          </section>

          <div className="seperator2" role="separator" aria-hidden="true" />

          <section 
            className="review-content-container" 
            aria-labelledby="review-title"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button 
              className="review-nav-button"
              aria-label="Previous review" 
              onClick={handlePrevSlide}
              onKeyDown={handleKeyDown}
            >
              <img className="review-left-arrow" src={arrowLeft} alt="left arrow" aria-hidden="true" />
            </button>
            
            <div 
              className="review-container" 
              role="region" 
              aria-roledescription="carousel" 
              aria-label="User testimonials"
              aria-live="polite"
            >
              <div 
                className={`review-slide ${currentSlide === 0 ? 'active' : 'hidden'}`}
                role="group" 
                aria-roledescription="slide" 
                aria-label="Testimonial 1 of 4"
                aria-hidden={currentSlide !== 0}
                tabIndex={currentSlide === 0 ? 0 : -1}
                ref={currentSlide === 0 ? activeSlideRef : null}
              >
                <h2 className="h-1">Hear It From Our Users</h2>
                <div className="review-sub-title">
                  <h3 className="h-18">Why Dealicious?</h3>
                </div>
                <p className="h-2-regular">
                  "Super easy to use, saves me time and money,
                  <br />
                  and helps me eat healthier. Highly recommend!"
                </p>
              </div>
              
              <div 
                className={`review-slide ${currentSlide === 1 ? 'active' : 'hidden'}`}
                role="group" 
                aria-roledescription="slide" 
                aria-label="Testimonial 2 of 4"
                aria-hidden={currentSlide !== 1}
                tabIndex={currentSlide === 1 ? 0 : -1}
                ref={currentSlide === 1 ? activeSlideRef : null}
              >
                <h2 className="h-1">Hear It From Our Users</h2>
                <div className="review-sub-title">
                  <h3 className="h-18">Why Dealicious?</h3>
                </div>
                <p className="h-2-regular">
                  "As a broke college student, Dealicious has been a lifesaver for my wallet.
                  <br />
                  I can actually eat well between classes without blowing my budget!"
                </p>
              </div>
              
              <div 
                className={`review-slide ${currentSlide === 2 ? 'active' : 'hidden'}`}
                role="group" 
                aria-roledescription="slide" 
                aria-label="Testimonial 3 of 4"
                aria-hidden={currentSlide !== 2}
                tabIndex={currentSlide === 2 ? 0 : -1}
                ref={currentSlide === 2 ? activeSlideRef : null}
              >
                <h2 className="h-1">Hear It From Our Users</h2>
                <div className="review-sub-title">
                  <h3 className="h-18">Why Dealicious?</h3>
                </div>
                <p className="h-2-regular">
                  "Between exams and projects, I never had time to plan meals properly.
                  <br />
                  Dealicious makes it so simple that even I can cook decent food in my tiny kitchen!"
                </p>
              </div>
              
              <div 
                className={`review-slide ${currentSlide === 3 ? 'active' : 'hidden'}`}
                role="group" 
                aria-roledescription="slide" 
                aria-label="Testimonial 4 of 4"
                aria-hidden={currentSlide !== 3}
                tabIndex={currentSlide === 3 ? 0 : -1}
                ref={currentSlide === 3 ? activeSlideRef : null}
              >
                <h2 className="h-1">Hear It From Our Users</h2>
                <div className="review-sub-title">
                  <h3 className="h-18">Why Dealicious?</h3>
                </div>
                <p className="h-2-regular">
                  "My roommates and I split grocery costs using Dealicious meal plans.
                  <br />
                  We're eating better, spending less, and actually enjoying cooking together!"
                </p>
              </div>
              
              <div className="carousel-indicators" aria-hidden="true">
                {[...Array(totalSlides)].map((_, index) => (
                  <button 
                    key={index}
                    className={`indicator ${currentSlide === index ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            <button 
              className="review-nav-button"
              aria-label="Next review" 
              onClick={handleNextSlide}
              onKeyDown={handleKeyDown}
            >
              <img className="review-right-arrow" src={arrowRight} alt="right arrow" aria-hidden="true" />
            </button>
          </section>
        </main>
      </div>
    </Layout>
  );
};

export default LandingPage;