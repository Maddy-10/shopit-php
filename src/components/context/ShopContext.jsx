import React, { createContext, useEffect, useState } from 'react';

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]); // Move this line inside the component

  useEffect(() => {
    getProductdata();
  }, []);

  const getProductdata = async () => {
    try {
      const req = await fetch("http://localhost/project/api/product.php");
      const res = await req.json();
      console.log(res);

      if (Array.isArray(res.products)) {
        setProducts(res.products);
      } else {
        console.error("Products array not found in the response:", res);
        // Handle the case where 'products' array is not found in the response
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const getDefaultCart = () => {
    let cart = {};
    for (let i = 1; i < products.length + 1; i++) {
      cart[i] = 0;
    }
    return cart;
  };

  const [cartItems, setCartItems] = useState(getDefaultCart());

  const getTotalCartAmount = () => {
    let TotalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product.id === Number(item));
        TotalAmount += cartItems[item] * itemInfo.our_price;
      }
    }
    return TotalAmount;
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };
  
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getTotalCartAmount,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
