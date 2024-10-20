import React, { useRef, useState, useEffect } from "react";
import "./circle-animation.css";
import { motion, useInView, useAnimation } from "framer-motion";
import about from "../../assets/images/about-logo.png";
import useWindowDimensions from "../../hooks/useWindowDimensions";

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

const getCirclePosition = (circleRadius, index, totalItems, isLeftSide) => {
  const angle = ((index + 0.5) / totalItems) * Math.PI;
  const x = Math.cos(angle) * (circleRadius - 50);
  const y = Math.sin(angle) * (circleRadius - 50);
  return isLeftSide ? { x: -x, y } : { x, y };
};

const getRandomRotation = () => {
  return (Math.random() * 180 - 90) / 2; // Limit rotation to -45 to 45 degrees
};

const DropAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.5 });
  const circleRadius = 250;
  const { width } = useWindowDimensions();
  const [elementPositions, setElementPositions] = useState([]);

  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const renderElements = (start, end, isLeftSide) => {
    const slicedElements = elements.slice(start, end);
    return slicedElements.map((el, index) => {
      const position = getCirclePosition(
        circleRadius,
        index,
        slicedElements.length,
        isLeftSide
      );
      return (
        <motion.div
          key={el.id}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { x: position.x, y: -circleRadius, rotate: 0, opacity: 0 },
            visible: {
              x: position.x,
              y: position.y,
              rotate: getRandomRotation(),
              opacity: 1,
              transition: {
                type: "spring",
                damping: 15,
                stiffness: 40,
                delay: index * 0.2,
              },
            },
          }}
          onUpdate={(latest) => {
            setElementPositions((prev) => {
              const newPositions = [...prev];
              newPositions[el.id] = latest.y;
              return newPositions;
            });
          }}
          className="element"
          style={{
            position: "absolute",
            zIndex: elementPositions[el.id]
              ? Math.round(1000 - elementPositions[el.id])
              : 1,
          }}
        >
          {el.text}
        </motion.div>
      );
    });
  };

  return (
    <div className="venn-container" ref={ref}>
      <motion.div
        className="circle left-circle"
        style={{ position: "relative" }}
      >
        {width > 700
          ? renderElements(0, 5, true)
          : renderElements(0, elements.length, true)}
      </motion.div>

      <motion.div
        className="center-text"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        drag
        dragTransition={{
          power: 0,
          modifyTarget: (target) => Math.round(target / 50) * 50,
        }}
      >
        <img src={about} alt="" />
      </motion.div>

      {width > 700 && (
        <motion.div
          className="circle right-circle"
          style={{ position: "relative" }}
        >
          {renderElements(5, elements.length, false)}
        </motion.div>
      )}
    </div>
  );
};

export default DropAnimation;
