import { useState } from "react";

const useToggleSidebar = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false)
  
  return [toggleSidebar, setToggleSidebar]
}

export default useToggleSidebar