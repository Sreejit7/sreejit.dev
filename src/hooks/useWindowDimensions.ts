import { useCallback, useState, useEffect } from "react";

const useWindowDimensions = () => {
  const [dimensions, updateDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const onResize = useCallback(() => {
    updateDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [onResize]);

  return {
    dimensions,
  };
};

export default useWindowDimensions;
