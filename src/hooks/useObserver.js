import { useEffect, useState, useRef } from "react";

export const useObserver = (container) => {
  const [visible, setVisible] = useState(false);
  const refContainer = useRef(container);

  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  };
  const callbackFN = (entries) => {
    const [entry] = entries;
    setVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFN, options);
    if (refContainer.current) {
      observer.observe(refContainer.current);
      setVisible(true);
    }
    return () => {
      if (refContainer.current) {
        observer.unobserve(refContainer.current);
      }
    };
  }, [refContainer]);

  return { visible, refContainer };
};
