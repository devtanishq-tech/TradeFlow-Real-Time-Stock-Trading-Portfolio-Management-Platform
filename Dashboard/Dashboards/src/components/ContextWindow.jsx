import React from "react";
import { useState } from "react";
import OrderWindow from "./OrderWindow";
const ContextWindow = React.createContext();
//   openWindow: (uuid) => {},
//   closeWindow: () => {},
export default function ContextWindowProvider({ children, setHoldings }) {
  const [isOpen, setisOpen] = useState(false);
  const [currentStockid, setcurrentStockid] = useState("");
  const [mode, setmode] = useState("");
  const HandleOpen = (uuid, actionMode) => {
    setisOpen(true);
    setcurrentStockid(uuid);
    setmode(actionMode);
  };
  // this event is for cancel, like when user dont want oto buy or sell stocks
  const HandleCancel = () => {
    setisOpen(false);
    setcurrentStockid("");
    setmode("");
  };
  return (
    <ContextWindow.Provider
      value={{ openWindow: HandleOpen, closeWindow: HandleCancel }}
    >
      {children}
      {isOpen && (
        <OrderWindow
          uuid={currentStockid}
          mode={mode}
          setHoldings={setHoldings}
        />
      )}
    </ContextWindow.Provider>
  );
}
export { ContextWindow };
