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
      setCartItems(localState.cartItems || [])
      setTotalPrice(localState.totalPrice || 0)
      setTotalQty(localState.totalQty || 0)
    }
  },[])

  useEffect(() => {
    const state = {
      showCart,
      totalQty,
      totalPrice,
      cartItems
    }

    if(showCart !== undefined){
      state.showCart = showCart
      localStorage.setItem('state', JSON.stringify(state));
    }
    if(totalPrice > 0){
      state.totalPrice = totalPrice
      localStorage.setItem('state', JSON.stringify(state));
    }
    if(totalQty > 0){
      state.totalQty = totalQty
      localStorage.setItem('state', JSON.stringify(state));
    }
    if(cartItems.length > 0){
      state.cartItems = cartItems
      localStorage.setItem('state', JSON.stringify(state));
    }else{
      setTotalPrice(0)
      setTotalQty(0)
      state.totalPrice = 0
      state.totalQty = 0
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
    
    if(foundProduct.quantity > 1){
      setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
      setTotalQty(prevTotalQty => prevTotalQty - foundProduct.quantity);
    }
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
        setCartItems,
        setTotalPrice,
        setTotalQty
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
