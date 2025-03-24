import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';
import '../style.css';
import groceryHero from '../assets/freshProduce.png';
import fiveStars from '../assets/five-stars.svg';
import costcoLogo from '../assets/COSTCO.svg';
import fredMeyerLogo from '../assets/FredMeyer.svg';
import qfcLogo from '../assets/QFC.svg';
import safewayLogo from '../assets/SAFEWAY.svg';
import shopBlack from '../assets/ShopIconBlack.svg';
import shopWhite from '../assets/ShopIconWhite.svg';

// Creating temp store values for MVP
const stores = [
  { name: 'QFC', rating: 4.5, location: 'Seattle, WA', logo: qfcLogo },
  { name: 'Safeway', rating: 4.3, location: 'Seattle, WA', logo: safewayLogo },
  { name: 'Costco', rating: 4.8, location: 'Seattle, WA', logo: costcoLogo },
  { name: 'Fred Meyer', rating: 4.2, location: 'Seattle, WA', logo: fredMeyerLogo },
];

//Creating temp categories for MVP
const categories = [
  'Fruit',
  'Vegetable',
  'Meat',
  'Seafood',
  'Dairy',
  'Pantry',
  'Plant-Based',
  'Protein',
];

//Creating temp tags for MVP
const popularTags = [
  'Sweet',
  'Healthy',
  'Leafy',
  'Organic',
  'High-Fat',
  'Free-Range',
  'Dinner',
  'Grass-Fed',
  'Citrus',
  'Bitter',
  'Root',
  'Starchy',
  'Lean',
  'Omega-3',
];

const GroceryDeals = () => {
  const [produce, setProduce] = useState([]);
  const [filteredProduce, setFilteredProduce] = useState([]);

  const [shoppingList, setShoppingList] = useState([]); 

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');

  const [sortOption, setSortOption] = useState('');

  const [ratingFilter, setRatingFilter] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerRow, setItemsPerRow] = useState(4);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const visibleTags = popularTags.slice(0, 6);

  useEffect(() => {
    document.title = "Dealicious - Grocery Deals";
  }, []);
  
  // setting specific amount of visible product in one page
  useEffect(() => {
    const updateItemsPerPage = () => {
      const screenWidth = window.innerWidth;
      let columns = 4;
      if (screenWidth > 1400) {
        columns = 5;
      } else if (screenWidth > 1000) {
        columns = 4;
      } else {
        columns = 3;
      }
      setItemsPerRow(columns);
      setItemsPerPage(columns * 3); 
    };
    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  // get produce data
  useEffect(() => {
    axios
      .get('https://dealicious-backend.onrender.com/data/data.json')
      .then((response) => {
        setProduce(response.data.ingredients || []);
        setFilteredProduce(response.data.ingredients || []);
      })
      .catch((error) => console.error('Error fetching produce:', error));
  }, []);
  
  // reset page
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategories, selectedTags, ratingFilter, sortOption]);

  
  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
  }, [shoppingList]);
  
  // Filter
  useEffect(() => {
    let result = [...produce];

    // search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter((item) => item.name.toLowerCase().includes(term));
    }

    // category filter
    if (selectedCategories.length > 0) {
      result = result.filter((item) =>
        item.categories.some((cat) => selectedCategories.includes(cat))
      );
    }

    // tag filter
    if (selectedTags.length > 0) {
      result = result.filter((item) =>
        selectedTags.every((tag) => item.tags.includes(tag))
      );
    }

    // rating filter
    if (ratingFilter) {
      result = result.filter((item) => item.rating >= 4.0);
    }

    // sorting
    if (sortOption === 'discountDesc') {
      result.sort((a, b) => {
        const aDiscount = a.discount?.amount || 0;
        const bDiscount = b.discount?.amount || 0;
        const aPct = aDiscount > 0 ? aDiscount / a.price : 0;
        const bPct = bDiscount > 0 ? bDiscount / b.price : 0;
        return bPct - aPct;
      });
    } else if (sortOption === 'priceAsc') {
      result.sort((a, b) => {
        const aDiscount = a.discount?.amount || 0;
        const bDiscount = b.discount?.amount || 0;
        const aFinal = a.price - aDiscount;
        const bFinal = b.price - bDiscount;
        return aFinal - bFinal;
      });
    }

    setFilteredProduce(result);
  }, [produce, searchTerm, selectedCategories, selectedTags, ratingFilter, sortOption]);

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleCategoryChange = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };
  const handleTagSelection = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const totalPages = Math.ceil(filteredProduce.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProduce.slice(indexOfFirstItem, indexOfLastItem);

  const handleAddToShoppingList = (item) => {
    setShoppingList((prevList) => {
      // Check for duplicates
      const alreadyAdded = prevList.find((prevItem) => prevItem.name === item.name);
      if (alreadyAdded) {
        return prevList; 
      }
      const uniqueItem = { ...item, id: Date.now() + Math.random() };
      return [...prevList, uniqueItem];
    });
    setShowShoppingList(true);
  };

  return (
    <Layout>
      <div
        className="grocery-hero"
        style={{ backgroundImage: `url(${groceryHero})` }}
        role="banner"
        aria-label="Fresh produce display background image"
      >
        <h1 className="hero-title">Grab your favorites, start saving today</h1>
      </div>
      
      <div className="store-selection">
        <h2>Select Your Store</h2>
        <div className="store-list">
          {stores.map((store, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedStore(store.name)}
              className="store-button"
              aria-label={`Select ${store.name} store`}
            >
              <div className="store-content">
                <img src={store.logo} alt={`${store.name} logo`} className="store-logo" />
                <div className="store-info">
                  <p>Open • Closes 11PM</p>
                  <p>⭐ {store.rating}</p>
                  <p>{store.location}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grocery-container">
        <div className="sidebar">
          <h3>All Categories</h3>
          {categories.map((cat, i) => (
            <div key={i}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
              />
              {cat}
            </div>
          ))}

          <h3>Rating</h3>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={ratingFilter}
                onChange={() => setRatingFilter(!ratingFilter)}
                style={{ marginRight: '0.5rem' }}
              />
              <div style={{ display: 'inline-flex', marginRight: '4px' }}>
                <span style={{ color: '#FFA500' }}>★</span>
                <span style={{ color: '#FFA500' }}>★</span>
                <span style={{ color: '#FFA500' }}>★</span>
                <span style={{ color: '#FFA500' }}>★</span>
                <span style={{ color: '#ccc' }}>★</span>
              </div>
              <span>&nbsp;&amp; Up</span>
            </label>
          </div>

          <h3>Popular Tags</h3>
          {visibleTags.map((tag, i) => (
            <button
              key={i}
              className={selectedTags.includes(tag) ? 'tag-selected' : 'tag'}
              onClick={() => handleTagSelection(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grocery-content">

          <div className="search-sort-container">
            <div className="search-sort">
              <input
                type="text"
                placeholder="Search produce..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-bar"
                aria-label="Search for produce"
              />

              <select onChange={(e) => setSortOption(e.target.value)}>
                <option value="">-- No Sorting --</option>
                <option value="discountDesc">Most Discount</option>
                <option value="priceAsc">Least Price</option>
              </select>
            </div>

            <div className="shopping-list-icon">
              <Link to="/shopping-list" className="shopping-list-link">
                <img src={shopBlack} alt="Shopping Bag" className="shopping-bag-icon" />
                My Coupons ({shoppingList.length})
              </Link>
            </div>
          </div>

          <div
            className="deals-container"
            style={{ gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)` }}
          >
            {currentItems.map((item, idx) => {
              const hasDiscount = item.discount?.amount > 0;
              const discountAmount = hasDiscount ? item.discount.amount : 0;
              const discountPercent = hasDiscount
                ? Math.round((discountAmount / item.price) * 100)
                : 0;
              const finalPrice = hasDiscount
                ? (item.price - discountAmount).toFixed(2)
                : item.price.toFixed(2);

              return (
                <div className="deal-card" key={idx}>
                  {hasDiscount && (
                    <div className="discount-badge" aria-label={`${discountPercent}% off`}>
                      {discountPercent}% OFF
                    </div>
                  )}
                  <h3 className="deal-title">{item.name}</h3>
                  <img src={item.image} alt={`Image of ${item.name}`} className="deal-image" />

                  {hasDiscount ? (
                    <p className="deal-price">
                      <span
                        style={{
                          textDecoration: 'line-through',
                          color: '#999',
                          marginRight: '8px',
                        }}
                      >
                        ${item.price.toFixed(2)}
                      </span>
                      <span style={{ color: '#249552', fontWeight: 'bold' }}>
                        ${finalPrice}
                      </span>
                    </p>
                  ) : (
                    <p className="deal-price">${finalPrice}</p>
                  )}

                  <div className="deal-rating">
                    <img src={fiveStars} alt="5 star rating" />
                  </div>

                  <button 
                  className="add-to-cart"
                  onClick={() => handleAddToShoppingList(item)}
                  onTouchStart={() => handleAddToShoppingList(item)}
                  aria-label={`Add ${item.name} to shopping list`}
                >
                  <img src={shopBlack} alt="Add to Shopping List" className="cart-icon black-icon" />
                  <img src={shopWhite} alt="Add to Shopping List" className="cart-icon white-icon" />
                </button>
                </div>
              );
            })}
          </div>

          <div className="pagination">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx}
                className={currentPage === idx + 1 ? 'active' : ''}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GroceryDeals;