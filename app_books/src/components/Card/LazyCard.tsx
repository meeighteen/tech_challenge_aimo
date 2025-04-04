import React, { Suspense, useEffect, useRef, useState } from "react";
import { propsCard } from "./Card";

const loadCard = () =>
  import("./Card").then((module) => ({
    default: module.Card,
  }));

export const LazyCard = ({ data }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [CardComponent, setCardComponent] =
    useState<React.ComponentType<propsCard> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && !CardComponent) {
      loadCard().then((module) => setCardComponent(() => module.default));
    }
  }, [isVisible, CardComponent]);

  return (
    <div style={{ width: "100%", minHeight: "120px" }} ref={ref}>
      {CardComponent ? (
        <Suspense fallback={<div>Loading...</div>}>
          <CardComponent {...data} />
        </Suspense>
      ) : (
        <div>Waiting to load...</div>
      )}
    </div>
  );
};
