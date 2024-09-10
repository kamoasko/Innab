import React, { useRef } from "react";
import "./circle-animation.css";
import { motion, useInView } from "framer-motion";
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

const getLeftSideXPosition = (circleRadius) => {
  return Math.random() * -circleRadius;
};

const getRightSideXPosition = (circleRadius) => {
  return Math.random() * circleRadius;
};

const getRandomRotation = () => {
  return Math.random() * 360 - 180;
};

const getBottomYPosition = (circleRadius) => {
  return circleRadius / 2;
};

const DropAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.5 });
  const circleRadius = 250;
  const { width } = useWindowDimensions();

  return (
    <div className="venn-container" ref={ref}>
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
                x: getLeftSideXPosition(circleRadius),
                rotate: getRandomRotation(),
              }}
              animate={
                isInView
                  ? {
                      y: getBottomYPosition(circleRadius),
                      rotate: getRandomRotation(),
                    }
                  : {}
              }
              transition={{
                type: "spring",
                damping: 15,
                stiffness: 40,
                delay: index * 0.2,
              }}
              className="element"
              style={{ position: "absolute" }}
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
                x: getLeftSideXPosition(circleRadius),
                rotate: getRandomRotation(),
              }}
              animate={
                isInView
                  ? {
                      y: getBottomYPosition(circleRadius),
                      rotate: getRandomRotation(),
                    }
                  : {}
              }
              transition={{
                type: "spring",
                damping: 15,
                stiffness: 40,
                delay: index * 0.2,
              }}
              className="element"
              style={{ position: "absolute" }}
            >
              {el.text}
            </motion.div>
          ))}
        </motion.div>
      )}

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

      <motion.div
        className="circle right-circle"
        style={{ position: "relative" }}
      >
        {elements.slice(5).map((el, index) => (
          <motion.div
            key={el.id}
            initial={{
              y: -150,
              x: getRightSideXPosition(circleRadius),
              rotate: getRandomRotation(),
            }}
            animate={
              isInView
                ? {
                    y: getBottomYPosition(circleRadius),
                    rotate: getRandomRotation(),
                  }
                : {}
            }
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 40,
              delay: index * 0.2,
            }}
            className="element"
            style={{ position: "absolute" }}
          >
            {el.text}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default DropAnimation;
