import React, { useRef } from "react";
import "./circle-animation.css";
import { motion, useInView } from "framer-motion";

// Example data to be animated
const elements = [
  {
    id: 1,
    text: "Təlim müddətində və təlimdən sonra sualların cavablandırılması",
  },
  { id: 2, text: "8+ illik təcrübə" },
  { id: 3, text: "Dövlət qurumları ilə əməkdaşlıq" },
  { id: 4, text: "900+ öyrədici youtube videoları" },
  { id: 5, text: "Əhatəli təlim planı" },
  { id: 6, text: "Peşəkar müəllimlər" },
  { id: 7, text: "En əsas bilikimizi paylaşmağı sevən mehriban komanda!" },
  { id: 8, text: "INNAB-ın peşəkar iş əlaqələrindən istifadə" },
  { id: 9, text: "Müasir ofis şəraiti" },
];

const DropAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.5 }); // triggers when 50% of the section is in view

  return (
    <div className="venn-container" ref={ref}>
      <motion.div
        className="circle left-circle"
        style={{ position: "relative" }}
      >
        {elements.slice(0, 5).map((el, index) => (
          <motion.div
            key={el.id}
            initial={{ y: -150 }}
            animate={isInView ? { y: 0 } : {}}
            transition={{
              type: "spring",
              damping: 10,
              stiffness: 100,
              delay: index * 0.2,
            }}
            className="element"
          >
            {el.text}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="center-text"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}} // Only animate if in view
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      >
        İnnab
      </motion.div>

      <motion.div
        className="circle right-circle"
        style={{ position: "relative" }}
      >
        {elements.slice(5).map((el, index) => (
          <motion.div
            key={el.id}
            initial={{ y: -150 }}
            animate={isInView ? { y: 0 } : {}}
            transition={{
              type: "spring",
              damping: 10,
              stiffness: 100,
              delay: index * 0.2,
            }}
            className="element"
          >
            {el.text}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default DropAnimation;
