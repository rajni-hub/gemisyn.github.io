import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";

const Collections = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const sliderRef = useRef(null);
  const controls = useAnimation();
  const [angle, setAngle] = useState(0);

  const collections = [
    {
      id: 1,
      name: "Classic Solitaire",
      price: "$5,000",
      image: "/assets/p1.jpeg",
    },
    {
      id: 2,
      name: "Vintage Halo",
      price: "$7,500",
      image: "/assets/p2.jpeg",
    },
    {
      id: 3,
      name: "Modern Trilogy",
      price: "$9,000",
      image: "/assets/p3.jpeg",
    },
    {
      id: 4,
      name: "Radiant Elegance",
      price: "$6,200",
      image: "/assets/p4.jpeg",
    },
    {
      id: 5,
      name: "Infinity Spark",
      price: "$7,800",
      image: "/assets/p5.jpeg",
    },
    {
      id: 6,
      name: "Celestial Halo",
      price: "$8,000",
      image: "/assets/p6.jpeg",
    },
  ];

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setAngle((prev) => prev + 0.5); // Slower rotation
      }, 50);
      return () => clearInterval(interval);
    }
  }, [inView]);

  return (
    <CollectionsSection ref={ref}>
      <SectionTitle
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        Our Collections
      </SectionTitle>
      <SliderContainer ref={sliderRef}>
        <Slider
          style={{
            "--quantity": collections.length,
            transform: `translate(-50%, -50%) perspective(1200px) rotateX(-16deg) rotateY(${angle}deg)`,
          }}
        >
          {collections.map((item, index) => (
            <SliderItem key={item.id} style={{ "--position": index + 1 }}>
              <ImageContainer>
                <CollectionImage src={item.image} alt={item.name} />
                <Overlay></Overlay>
              </ImageContainer>
              <ItemInfo>
                <ItemName
                  style={{
                    transform: index % 2 === 1 ? "scaleX(-1)" : "scaleX(-1)",
                  }}
                >
                  {item.name}
                </ItemName>
                <ItemPrice
                  style={{
                    transform: index % 2 === 1 ? "scaleX(-1)" : "scaleX(-1)",
                  }}
                >
                  {item.price}
                </ItemPrice>
              </ItemInfo>
            </SliderItem>
          ))}
        </Slider>
      </SliderContainer>
    </CollectionsSection>
  );
};

const CollectionsSection = styled.section`
  padding: 4.5rem 2rem;
  background-color: transparent;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: clamp(2rem, 4vw, 3.5rem);
  margin-bottom: 0rem;
  font-weight: 500;
  color: #ffffff;
  font-family: "Encode Sans";
`;

const SliderContainer = styled.div`
  width: 100%;
  height: 900px;
  position: relative;
  perspective: 1200px;
`;

const Slider = styled.div`
  position: absolute;
  width: 650px;
  height: 550px;
  top: 30%;
  left: 50%;
  transform-style: preserve-3d;
`;

const SliderItem = styled.div`
  position: absolute;
  inset: 0;
  transform: rotateY(calc((var(--position) - 1) * (360deg / var(--quantity))))
    translateZ(650px);
  transform-style: preserve-3d;
  transition: transform 0.5s ease;

  &:hover {
    transform: rotateY(calc((var(--position) - 1) * (360deg / var(--quantity))))
      translateZ(680px) scale(1.05);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
`;

const CollectionImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${ImageContainer}:hover & {
    transform: scale(1.15);
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.5s ease;

  ${ImageContainer}:hover & {
    opacity: 1;
  }
`;

const ItemInfo = styled.div`
  bottom: -80px;
  left: 0;
  width: 100%;
  text-align: center;
  color: #25283b;
  transform: translateZ(20px);
  transition: transform 0.3s ease;
  padding-top: 2rem;

  ${SliderItem}:hover & {
    transform: translateZ(30px);
  }
`;

const ItemName = styled.h3`
  color: #ffffff;
  margin-top: 0rem;
  font-size: 3rem;
  margin-bottom: 0.3em;
  font-weight: 500;
  font-family: "Poppins", sans-serif;
`;

const ItemPrice = styled.p`
  font-size: 2rem;
  font-weight: 600;
  color: #4a4a4a;
  font-family: "Poppins", sans-serif;
`;

export default Collections;
