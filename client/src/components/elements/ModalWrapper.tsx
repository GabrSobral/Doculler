import { ReactNode, useEffect, useState } from "react"
import { createPortal } from 'react-dom';

interface Props {
  children: ReactNode
}

export const ModalWrapper = ({ children } : Props) => {
  const [ isMounted, setIsMounted ] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  },[])

  return isMounted ?
    createPortal(children,  document.querySelector("#modal")!) : null;
}