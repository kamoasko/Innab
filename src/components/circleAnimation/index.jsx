import React, { useRef } from "react";
import "./circle-animation.css";
import { motion, useInView } from "framer-motion";
import about from "../../assets/images/about-logo.png";
import useWindowDimensions from "../../hooks/useWindowDimensions";

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

// Helper function to generate random values for scattering within the left side of the circle
const getLeftSideXPosition = (circleRadius) => {
  return Math.random() * -circleRadius; // Random value between -radius and 0 (left side)
};

// Helper function to generate random values for scattering within the right side of the circle
const getRightSideXPosition = (circleRadius) => {
  return Math.random() * circleRadius; // Random value between 0 and +radius (right side)
};

// Helper function to generate random rotation
const getRandomRotation = () => {
  return Math.random() * 360 - 180; // Random rotation between -180 and 180 degrees
};

// Function to set elements to the bottom of the circle
const getBottomYPosition = (circleRadius) => {
  return circleRadius / 2; // Puts the elements at the bottom of the circle
};

const DropAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.5 }); // triggers when 50% of the section is in view
  const circleRadius = 250; // Adjust according to your circle size (example)
  const { width } = useWindowDimensions();

  return (
    <div className="venn-container" ref={ref}>
      {/* Left Circle */}
      {width > 700 ? (
        <motion.div
          className="circle left-circle"
          style={{ position: "relative" }}
        >
          {elements.slice(0, 5).map((el, index) => (
            <motion.div
              key={el.id}
              initial={{
                y: -150,
                x: getLeftSideXPosition(circleRadius), // Left side scatter
                rotate: getRandomRotation(),
              }} // Random horizontal scatter and rotation
              animate={
                isInView
                  ? {
                      y: getBottomYPosition(circleRadius),
                      rotate: getRandomRotation(),
                    }
                  : {}
              } // Drop vertically to the bottom
              transition={{
                type: "spring",
                damping: 15, // Slower stop
                stiffness: 40, // Slower spring
                delay: index * 0.2, // Staggered drop
              }}
              className="element"
              style={{ position: "absolute" }} // Ensure absolute positioning inside the circle
            >
              {el.text}
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="circle left-circle"
          style={{ position: "relative" }}
        >
          {elements.map((el, index) => (
            <motion.div
              key={el.id}
              initial={{
                y: -150,
                x: getLeftSideXPosition(circleRadius), // Left side scatter
                rotate: getRandomRotation(),
              }} // Random horizontal scatter and rotation
              animate={
                isInView
                  ? {
                      y: getBottomYPosition(circleRadius),
                      rotate: getRandomRotation(),
                    }
                  : {}
              } // Drop vertically to the bottom
              transition={{
                type: "spring",
                damping: 15, // Slower stop
                stiffness: 40, // Slower spring
                delay: index * 0.2, // Staggered drop
              }}
              className="element"
              style={{ position: "absolute" }} // Ensure absolute positioning inside the circle
            >
              {el.text}
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Center Text (innab) */}
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

      {/* Right Circle */}
      <motion.div
        className="circle right-circle"
        style={{ position: "relative" }}
      >
        {elements.slice(5).map((el, index) => (
          <motion.div
            key={el.id}
            initial={{
              y: -150,
              x: getRightSideXPosition(circleRadius), // Right side scatter
              rotate: getRandomRotation(),
            }} // Random horizontal scatter and rotation
            animate={
              isInView
                ? {
                    y: getBottomYPosition(circleRadius),
                    rotate: getRandomRotation(),
                  }
                : {}
            } // Drop vertically to the bottom
            transition={{
              type: "spring",
              damping: 15, // Slower stop
              stiffness: 40, // Slower spring
              delay: index * 0.2, // Staggered drop
            }}
            className="element"
            style={{ position: "absolute" }} // Ensure absolute positioning inside the circle
          >
            {el.text}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default DropAnimation;
