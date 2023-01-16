import React, { useState, createContext, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
  const [qty, setQty] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [showCart, setShowCart] = useState();

  let foundProduct;
  let index;

  useEffect(() => {
    const localState = JSON.parse(localStorage.getItem('state'));
    
    if(localState) {
      setShowCart(localState.showCart || false)
      if(localState.cartItems.length == 0){
        setTotalPrice(0)
      }
      setCartItems(localState.cartItems || [])
    }
  },[])

  useEffect(() => {
    if(showCart !== undefined){
      const state = { showCart, cartItems }
  
      localStorage.setItem('state', JSON.stringify(state));
    }

  }, [cartItems, showCart])

  const incQty = () => {
    setQty((prevQty) => {
      return prevQty + 1;
    });
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQty((prevTotalQty) => prevTotalQty + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem._id === product._id)
          return {
            ...cartItem,
            quantity: cartItem.quantity + quantity,
          };
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const onRemove = (id) => {
    foundProduct = cartItems.find(
      (item) => item._id === id
    );
    const newCartItems = cartItems.filter((item) => item._id !== id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
    setTotalQty(prevTotalQty => prevTotalQty - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  const onQtyUpdate = (id, type) => {
    foundProduct = cartItems.find(
      (item) => item._id === id
    );

    const newCartItems = cartItems.filter((item) => item._id !== id);

    if(type === 'inc'){
      setCartItems([...newCartItems, { 
        ...foundProduct, quantity: foundProduct.quantity + 1 
      }])
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQty((prevTotalQty) => prevTotalQty + 1)
    }else if(type === 'dec'){
      if(foundProduct.quantity > 1){
        setCartItems([...newCartItems, { 
        ...foundProduct, quantity: foundProduct.quantity - 1
      }])
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQty((prevTotalQty) => prevTotalQty - 1)
      }
    }
  }

  return (
    <Context.Provider
      value={{
        qty,
        incQty,
        decQty,
        onAdd,
        onRemove,
        totalPrice,
        totalQty,
        showCart,
        setShowCart,
        cartItems,
        onQtyUpdate,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
