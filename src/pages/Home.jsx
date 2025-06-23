import styled from "styled-components";
import Hero from "../components/sections/Hero";
import Story from "../components/sections/Story";
import Collections from "../components/sections/Collections";
import DiamondViewer from "../components/sections/DiamondViewer";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/layout/Header";

const Home = () => {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const collectionsRef = useRef(null);
  const diamondRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const scrollToRef = (ref) => {
      setTimeout(() => {
        if (ref.current) {
          ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    };

    switch (location.hash) {
      case "#diamond":
        scrollToRef(diamondRef);
        break;
      case "#hero":
        scrollToRef(heroRef);
        break;
      case "#collections":
        scrollToRef(collectionsRef);
        break;
      case "#hero":
        scrollToRef(heroRef);
        break;
      default:
        break;
    }
  }, [location.hash]);

  return (
    <Main>
      <StyledHeaderWrapper>
        <Header />
      </StyledHeaderWrapper>
      <Section id="diamond" ref={diamondRef}>
        <DiamondViewer />
      </Section>
      <Section id="story" ref={storyRef}>
        <Hero />
      </Section>
      <Section id="collections" ref={collectionsRef}>
        <Collections />
      </Section>
      <LastSection id="hero" ref={heroRef}>
        <Story />
      </LastSection>
    </Main>
  );
};

const StyledHeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  padding: 0.5rem 1.5rem;
  border-radius: 0 0 1rem 1rem;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.6);
`;

const Main = styled.main`
  min-height: 100vh;
  scroll-behavior: smooth;
  scroll-snap-type: y proximity;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Section = styled.section`
  min-height: 100vh;
  width: 100%;
  scroll-snap-align: start;
  position: relative;
`;

const LastSection = styled(Section)`
  min-height: auto;
  padding-bottom: 0;
`;

export default Home;
