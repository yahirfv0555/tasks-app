'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import Message, { MessageProps } from './message';
import { motion, AnimatePresence } from "framer-motion";

interface MessageProviderProps {
  setMessage: (message: MessageProps) => void;
}

const MessageContext = createContext<MessageProviderProps>({ setMessage: () => {} });

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
};

export const MessageProvider = ({ children }: { children: React.ReactNode }) => {
    
  const [message, setMessage] = useState<MessageProps | undefined>()
  const [showMessage, setShowMessage] = useState<boolean>(false);

  useEffect(() => {
    if (message !== undefined) handleMessage();
  }, [message]);

  const handleMessage = () => {
    setTimeout(() => {
      setMessage(undefined);
    }, 5000);
  }

  return (
    <MessageContext.Provider value={{ setMessage }}>
      {message !== undefined &&
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.5 }}
          className="absolute top-4 right-4"
        >
          <Message {...message}/>
        </motion.div>
      }      
      {children}
    </MessageContext.Provider>
  )
}

export const useMessageProvider = () => {
  return useContext(MessageContext)
}
