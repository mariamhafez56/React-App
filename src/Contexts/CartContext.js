import { createContext, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  let [cartNumber, setCartNumber] = useState(0);

  return (
    <CartContext.Provider value={{ cartNumber, setCartNumber }}>
      {children}
    </CartContext.Provider>
  );
}
