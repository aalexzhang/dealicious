import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import '../style.css';
import groceryHero from '../assets/freshProduce.png';

const ShoppingListPage = () => {
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    document.title = "Dealicious - Shopping List";
  }, []);
  
  // Load product list from localStorage
  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem('shoppingList')) || [];
    setShoppingList(savedList);
  }, []);

  // Handle removing items from shopping list
  const handleRemoveFromShoppingList = (itemId) => {
    const updatedList = shoppingList.filter((item) => item.id !== itemId);
    setShoppingList(updatedList);
    localStorage.setItem('shoppingList', JSON.stringify(updatedList));
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

      <div className="shopping-list-container">
        {shoppingList.length === 0 ? (
          <p className="empty-list" role="alert">No items added yet.</p>
        ) : (
          <table className="coupon-table">
            <thead>
              <tr>
                <th scope="col">PRODUCT</th>
                <th scope="col">PRICE</th>
                <th scope="col">AVAILABILITY</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {shoppingList.map((item) => {
                const hasDiscount = item.discount && item.discount.amount > 0;
                const oldPrice = hasDiscount ? item.price : null;
                const newPrice = hasDiscount
                  ? (item.price - item.discount.amount).toFixed(2)
                  : item.price.toFixed(2);

                const isAvailable = hasDiscount; 

                return (
                  <tr key={item.id}>
                    <td>
                      <div className="product-info">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={`Image of ${item.name}`}
                            className="product-image"
                          />
                        )}
                        <span>{item.name}</span>
                      </div>
                    </td>

                    <td>
                      {hasDiscount && (
                        <span className="old-price">
                          ${oldPrice?.toFixed(2)}
                        </span>
                      )}
                      <span className="new-price">${newPrice}</span>
                    </td>

                    <td>
                      {isAvailable ? (
                        <span className="status available">Available</span>
                      ) : (
                        <span className="status unavailable">Unavailable</span>
                      )}
                    </td>

                    <td>
                    <button
                      className={`clip-coupon-btn ${isAvailable ? '' : 'disabled'}`}
                      disabled={!isAvailable}
                      onClick={() => handleAddToShoppingList(item)}
                      onTouchStart={() => handleAddToShoppingList(item)}
                      aria-label={`Clip coupon for ${item.name} at ${newPrice}`}
                    >
                      Clip the coupon
                    </button>

                      <button
                        className="remove-btn"
                        onClick={() => handleRemoveFromShoppingList(item.id)}
                        onTouchStart={() => handleRemoveFromShoppingList(item.id)}
                        aria-label={`Remove ${item.name} from shopping list`}
                      >
                        X
                      </button>

                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
};

export default ShoppingListPage;
