import styled from "styled-components";

import { motion } from "framer-motion";

import { useInView } from "react-intersection-observer";

import { useEffect } from "react";

const Hero = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    const header = document.getElementById("site-header");
    if (header) {
      header.style.opacity = "0";
      header.style.pointerEvents = "none";
    }

    return () => {
      if (header) {
        header.style.opacity = "1";
        header.style.pointerEvents = "auto";
      }
    };
  }, []);

  return (
    <HeroSection ref={ref}>
      <ContentWrapper>
        <AboutSection>
          <SectionLabel>ABOUT GEMISYN</SectionLabel>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <MainTitle>Pioneering Lab Diamond Expertise</MainTitle>
            <Description>
              Since 1931, GEMISYN has set the global standard in gemology. As
              innovation reshapes the industry, GEMISYN leads with trusted
              research and certification—empowering confidence in both natural
              and lab-grown diamonds.
            </Description>
          </motion.div>
        </AboutSection>

        <VideoWrapper>
          <iframe
            src="https://www.youtube.com/embed/tXdPlZPI9qM?start=44"
            title="Welcome to GEMISYN"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </VideoWrapper>
      </ContentWrapper>
    </HeroSection>
  );
};

const HeroSection = styled.section`
  height: 101vh;

  width: 100%;

  background: transparent;

  color: #ffffff;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 2rem;
`;

const ContentWrapper = styled.div`
  max-width: 1100px;

  text-align: center;
`;

const AboutSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionLabel = styled.div`
  margin-top: 1rem;
  font-size: 0.85rem;

  letter-spacing: 2px;

  color: #ffffff;

  margin-bottom: 1rem;
`;

const MainTitle = styled.h1`
  font-size: clamp(2rem, 4vw, 3rem);
  font-family: "Encode Sans";
  font-weight: 400;

  margin-bottom: 1rem;

  color: #ffffff;
`;

const Description = styled.p`
  font-size: clamp(1rem, 1.3vw, 1.2rem);

  line-height: 1.6;

  color: #ccc;

  max-width: 850px;

  margin: 0 auto;
`;

const VideoWrapper = styled.div`
  position: relative;

  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */

  height: 0;

  overflow: hidden;

  max-width: 720px;

  margin: 0 auto;

  iframe {
    position: absolute;

    top: 0;

    left: 0;

    width: 100%;

    height: 100%;
  }
`;

export default Hero;
