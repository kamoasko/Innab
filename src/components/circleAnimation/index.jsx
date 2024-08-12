import React, { useEffect, useRef } from "react";
import "./circle-animation.css";

const AnimatedElement = ({ children, delay }) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("animate");
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  return (
    <div ref={ref} className="animated-element">
      {children}
    </div>
  );
};

const Animation = () => {
  const baseDelay = 200; // Adjust this value to control the overall speed

  return (
    <div className="animation-container">
      <div className="circle circle-left">
        <AnimatedElement delay={baseDelay * 1}>
          Təlim müddətində və təlimdən sonra sualların cavablandırılması
        </AnimatedElement>
        <AnimatedElement delay={baseDelay * 2}>
          8+ illik təcrübə
        </AnimatedElement>
        <AnimatedElement delay={baseDelay * 3}>
          Əhatəli təlim planı
        </AnimatedElement>
        <AnimatedElement delay={baseDelay * 4}>
          Dövlət qurumları ilə əməkdaşlıq
        </AnimatedElement>
        <AnimatedElement delay={baseDelay * 5}>
          Peşəkar müəllimlər
        </AnimatedElement>
      </div>
      <div className="circle circle-right">
        <AnimatedElement delay={baseDelay * 1}>
          Ən əsası biliyimizi paylaşmağı sevən mehriban komanda!
        </AnimatedElement>
        <AnimatedElement delay={baseDelay * 2}>
          INNAB-ın peşəkar iş əlaqələrindən istifadə
        </AnimatedElement>
        <AnimatedElement delay={baseDelay * 3}>
          Əhatəli təlim planı
        </AnimatedElement>
        <AnimatedElement delay={baseDelay * 4}>
          900+ öyrədici youtube videoları
        </AnimatedElement>
        <AnimatedElement delay={baseDelay * 5}>
          Müasir ofis şəraiti
        </AnimatedElement>
      </div>
      <div className="innab">innab</div>
    </div>
  );
};

export default Animation;
