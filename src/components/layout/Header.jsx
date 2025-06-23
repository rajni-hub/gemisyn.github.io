import styled from "styled-components";
import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 20);

      if (currentScrollY > prevScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  useEffect(() => {
    setHidden(false);
    setScrolled(false);
    setPrevScrollY(0);
  }, [location.pathname]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${id}`);
      }
    }
  };

  if (location.pathname === "/diamond-viewer") return null;

  return (
    <HeaderWrapper
      as={motion.div}
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <StyledHeader $scrolled={scrolled}>
        <HeaderContainer>
          <Logo>
            <a href="#diamond" onClick={(e) => handleNavClick(e, "diamond")}>
              GEMISYN
            </a>
          </Logo>
          <Nav>
            <a href="#story" onClick={(e) => handleNavClick(e, "story")}>
              ABOUT
            </a>
            <a
              href="#collections"
              onClick={(e) => handleNavClick(e, "collections")}
            >
              COLLECTIONS
            </a>
            <a href="#hero" onClick={(e) => handleNavClick(e, "hero")}>
              CONTACT
            </a>
          </Nav>
        </HeaderContainer>
      </StyledHeader>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  padding: 0.5rem;
  pointer-events: none;
`;

const StyledHeader = styled.header`
  background: ${({ $scrolled }) =>
    $scrolled ? "rgba(18, 18, 18, 0.98)" : "rgba(18, 18, 18, 0.8)"};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  transition: all 0.4s ease;
  pointer-events: auto;
`;

const HeaderContainer = styled.div`
  max-width: 1900px;
  margin: 0;
  padding: 0.4rem 1rem;
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  font-family: var(--font-primary);
  font-size: 1.5rem;
  flex: 0 0 auto;

  a {
    color: var(--color-primary);
    text-decoration: none;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 0.8;
    }
  }
`;

const Nav = styled.nav`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-right: 0rem;

  a {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 400;
    font-size: 0.95rem;
    letter-spacing: 0.5px;
    position: relative;
    transition: all 0.3s ease;
    padding: 0.5rem 0;

    &:after {
      content: "";
      position: absolute;
      width: 100%;
      height: 1px;
      bottom: 0;
      left: 0;
      background-color: var(--color-primary);
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.3s ease;
    }

    &:hover {
      opacity: 0.8;

      &:after {
        transform: scaleX(1);
        transform-origin: left;
      }
    }
  }
`;

export default Header;
