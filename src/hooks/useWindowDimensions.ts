import { useCallback, useState, useEffect, useMemo } from "react";

const useWindowDimensions = () => {
  const [dimensions, updateDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const [isMobileView, setIsMobileView] = useState(typeof window !== "undefined" && window.innerWidth <= 768);
  
  const onResize = useCallback(() => {
    updateDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    if(window.innerWidth <= 768){
      setIsMobileView(true);
    }else{
      setIsMobileView(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);

  return {
    dimensions,
    isMobileView
  };
};

export default useWindowDimensions;
