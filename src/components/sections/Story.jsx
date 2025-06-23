import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaLinkedin, FaPagelines, FaLeaf } from "react-icons/fa";
import { PiButterflyFill } from "react-icons/pi";
import { GiTreeGrowth } from "react-icons/gi";

const Footer = () => {
  return (
    <FooterSection>
      <FooterContainer>
        <FooterGrid>
          <NavigationSection>
            <SectionTitle>Navigation</SectionTitle>
            <NavLinks>
              <NavLink to="/services">Services</NavLink>
              <NavLink to="/projects">Projects</NavLink>
              <NavLink to="/blog">Blog</NavLink>
              <NavLink to="/bookmarks">Bookmarks</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </NavLinks>
          </NavigationSection>

          <SocialSection>
            <SectionTitle>Follow me</SectionTitle>
            <SocialLinks>
              <SocialLink
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin /> LinkedIn
              </SocialLink>
              <SocialLink
                href="https://bluesky.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <PiButterflyFill /> Bluesky
              </SocialLink>
            </SocialLinks>
          </SocialSection>

          <SustainabilitySection>
            <SectionTitle>Sustainability</SectionTitle>
            <SustainabilityLinks>
              <SustainabilityLink href="#">
                <GiTreeGrowth /> View my Ecologi forest
              </SustainabilityLink>
              <SustainabilityLink href="#">
                <FaLeaf /> View my Beacon score
              </SustainabilityLink>
            </SustainabilityLinks>
          </SustainabilitySection>

          <BadgesSection>
            <BadgeImage src="/assets/logo.png" alt="Logo" />
          </BadgesSection>
        </FooterGrid>

        <FooterBottom>
          <Copyright>© 2020 – 2025 GEMISYN</Copyright>
          <HostingInfo>
            Hosted with{" "}
            <HostingLink
              href="https://krystal.uk"
              target="_blank"
              rel="noopener noreferrer"
            >
              Krystal
            </HostingLink>
            . Powered by renewables.
          </HostingInfo>
        </FooterBottom>
      </FooterContainer>
    </FooterSection>
  );
};

const FooterSection = styled.footer`
  background-color: transparent;
  padding: 1rem 2rem 2rem;
  color: #ffffff;
  margin-bottom: 0;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  margin-bottom: 4rem;

  @media (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #ffffff;
  letter-spacing: 0.5px;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const NavLink = styled(Link)`
  color: #888888;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  position: relative;
  width: fit-content;

  &:hover {
    color: #ffffff;
    transform: translateX(4px);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SocialLink = styled.a`
  color: #888888;
  text-decoration: none;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  width: fit-content;

  svg {
    font-size: 1.1rem;
  }

  &:hover {
    color: #ffffff;
    transform: translateX(4px);
  }
`;

const SustainabilityLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SustainabilityLink = styled.a`
  color: #888888;
  text-decoration: none;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  width: fit-content;

  svg {
    font-size: 1.1rem;
  }

  &:hover {
    color: #ffffff;
    transform: translateX(4px);
  }
`;

const BadgesGrid = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  flex-wrap: wrap;
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid #333333;
  font-size: 0.85rem;
  color: #888888;

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

const Copyright = styled.p`
  margin: 0;
`;

const HostingInfo = styled.p`
  margin: 0;
`;

const HostingLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const NavigationSection = styled.div``;
const SocialSection = styled.div``;
const SustainabilitySection = styled.div``;

const BadgesSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding-top: 0.5rem;
`;

const BadgeImage = styled.img`
  width: 330px;
  height: auto;
  object-fit: contain;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    margin: 0 auto;
  }
`;

export default Footer;
