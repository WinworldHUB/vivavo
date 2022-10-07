import { useState } from "react";

const useNotificationModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [message, setMesage] = useState("Processing ...");

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  const updateMessage = (newMessage) => setMesage(newMessage);

  return [isShowing, message, { toggle, updateMessage }];
};

export default useNotificationModal;
