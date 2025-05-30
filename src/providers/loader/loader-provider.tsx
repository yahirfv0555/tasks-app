'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import Loader from './loader';

interface LoaderProviderProps {
  setIsLoading: (value: boolean) => void;
  isLoading: boolean;
  setColor?: (value: string) => void;
}

const LoaderContext = createContext<LoaderProviderProps>({ setIsLoading: () => {}, isLoading: false });

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
    
  const [isLoading, setLoading] = useState<boolean>(false);
  const [color, setColor] = useState<string | undefined>();

  const handlerIsLoading = (value: boolean) => {
    setLoading(value);
  }

  const handleColor = (value: string) => {
    setColor(value);
  }

  useEffect(() => {
    
  }, []);

  return (
    <LoaderContext.Provider value={{ setIsLoading: handlerIsLoading, setColor: handleColor, isLoading: isLoading }}>
      { isLoading === true && <Loader color={color} /> }
      {children}
    </LoaderContext.Provider>
  )
}

export const useLoaderProvider = () => {
  return useContext(LoaderContext)
}
