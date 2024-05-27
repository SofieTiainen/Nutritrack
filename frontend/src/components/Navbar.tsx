import {
  Styledatag,
  NavbarWrapper,
  HamMenuUl,
  LoginDiv,
  NavbarUl,
  DIV,
} from "./Navbar.styled";
import { H1, FlexDiv, Styledli } from "../styles/global.styled";
import { LoginForm } from "./LoginForm";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { Colors } from "../styles/colors";
import { useNavigate } from "react-router-dom";
import { StyledLink } from "./Navbar.styled";
import React from "react";

export const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isActiveNav, setIsActiveNav] = useState(false);
  const [isActiveHam, setIsActiveHam] = useState(false);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const handleActiveDiv = () => {
    setIsActiveHam(!isActiveHam);
  };

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsActiveNav(true);
      } else {
        setIsActiveNav(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    sectionId: string
  ) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    const navbarHeight = 50;

    if (section) {
      const offset = section.offsetTop - navbarHeight;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/nutritrack");
    setIsActiveHam(false);
    setIsLoginOpen(false);
  };

  return (
    <>
      {token ? (
        <NavbarWrapper $active={isActiveNav || isActiveHam}>
          <FlexDiv $alignItems="center">
            <DIV $active={isActiveHam} $activeNav={isActiveNav}>
              <HamMenuUl>
                <Styledli>
                  <StyledLink to={"/nutritrack/dashboard"} onClick={handleActiveDiv}>DASHBOARD</StyledLink>
                </Styledli>
                <Styledli>
                  <StyledLink to={"/nutritrack/clients"} onClick={handleActiveDiv}>CLIENTS</StyledLink>
                </Styledli>
                <Styledli>
                  <Styledatag
                    $fontSize="18px"
                    $hoverColor={Colors.Green200}
                    onClick={() => {
                      logout();
                    }}
                  >
                    LOGOUT
                  </Styledatag>
                </Styledli>
              </HamMenuUl>
            </DIV>
          </FlexDiv>
          <FlexDiv>
            <NavbarUl>
              <FlexDiv $alignItems="center">
                {isActiveHam ? (
                  <RxCross1
                    onClick={handleActiveDiv}
                    cursor={"pointer"}
                    style={{
                      fontSize: isActiveNav ? "24px" : "30px",
                      marginLeft: "25px",
                      marginRight: "5px",
                    }}
                    color={Colors.Green400}
                  />
                ) : (
                  <RxHamburgerMenu
                    onClick={handleActiveDiv}
                    cursor={"pointer"}
                    style={{
                      fontSize: isActiveNav ? "24px" : "30px",
                      marginLeft: "25px",
                      marginRight: "5px",
                    }}
                    color={Colors.Green400}
                  />
                )}
                <H1 $active={isActiveNav} $marginLeft="15px">
                  Nutritrack
                </H1>
              </FlexDiv>
            </NavbarUl>
          </FlexDiv>
        </NavbarWrapper>
      ) : (
        <>
          <NavbarWrapper $active={isActiveNav || isActiveHam}>
            <FlexDiv $alignItems="center">
              <DIV $active={isActiveHam} $activeNav={isActiveNav}>
                <HamMenuUl>
                  <Styledli>
                    <Styledatag
                      $fontSize="18px"
                      $hoverColor={Colors.Green200}
                      href="#about"
                      onClick={(e) => {
                        scrollToSection(e, "about");
                        setIsActiveHam(!isActiveHam);
                      }}
                    >
                      ABOUT
                    </Styledatag>
                  </Styledli>
                  <Styledli>
                    <Styledatag
                      $fontSize="18px"
                      $hoverColor={Colors.Green200}
                      href="#how-it-works"
                      onClick={(e) => {
                        scrollToSection(e, "how-it-works");
                        setIsActiveHam(!isActiveHam);
                      }}
                    >
                      HOW IT WORKS
                    </Styledatag>
                  </Styledli>
                  <Styledli>
                    <Styledatag
                      $fontSize="18px"
                      $hoverColor={Colors.Green200}
                      href="#register"
                      onClick={(e) => {
                        scrollToSection(e, "register");
                        setIsActiveHam(!isActiveHam);
                      }}
                    >
                      REGISTER
                    </Styledatag>
                  </Styledli>
                  <Styledli>
                    <Styledatag
                      $fontSize="18px"
                      $hoverColor={Colors.Green200}
                      href="#contact"
                      onClick={(e) => {
                        scrollToSection(e, "contact");
                        setIsActiveHam(!isActiveHam);
                      }}
                    >
                      CONTACT
                    </Styledatag>
                  </Styledli>
                  <Styledli>
                    <Styledatag
                      $fontSize="18px"
                      $hoverColor={Colors.Green200}
                      onClick={toggleLogin}
                    >
                      LOGIN
                    </Styledatag>
                  </Styledli>
                </HamMenuUl>
              </DIV>
            </FlexDiv>
            <FlexDiv>
              <NavbarUl>
                <FlexDiv $alignItems="center">
                  {isActiveHam ? (
                    <RxCross1
                      onClick={handleActiveDiv}
                      cursor={"pointer"}
                      style={{
                        fontSize: isActiveNav ? "24px" : "30px",
                        marginLeft: "25px",
                        marginRight: "5px",
                      }}
                      color={Colors.Green400}
                    />
                  ) : (
                    <RxHamburgerMenu
                      onClick={handleActiveDiv}
                      cursor={"pointer"}
                      style={{
                        fontSize: isActiveNav ? "24px" : "30px",
                        marginLeft: "25px",
                        marginRight: "5px",
                      }}
                      color={Colors.Green400}
                    />
                  )}
                  <Styledli>
                    <Styledatag
                      href="#video"
                      onClick={(e) => {
                        scrollToSection(e, "video");
                      }}
                    >
                      <H1 $active={isActiveNav} $marginLeft="15px">
                        Nutritrack
                      </H1>
                    </Styledatag>
                  </Styledli>
                </FlexDiv>
                <FlexDiv>
                  <Styledli
                    $borderRadius="3px"
                    $padding="7px"
                    $marginRight="24px"
                    $width="100px"
                    $textAlign="center"
                  >
                    <Styledatag
                      onClick={toggleLogin}
                      $hoverColor={`${Colors.Gray300}`}
                      $fontSize="16px"
                      $color={`${Colors.Gray600}`}
                    >
                      LOGIN
                    </Styledatag>
                  </Styledli>
                  <Styledli
                    $borderRadius="3px"
                    $padding="7px"
                    $marginRight="24px"
                    $width="100px"
                    $textAlign="center"
                  >
                    <Styledatag
                      $hoverColor={`${Colors.Gray300}`}
                      $fontSize="16px"
                      $color={`${Colors.Gray600}`}
                      href="#register"
                      onClick={(e) => {
                        scrollToSection(e, "register");
                      }}
                    >
                      REGISTER
                    </Styledatag>
                  </Styledli>
                </FlexDiv>
              </NavbarUl>
            </FlexDiv>
          </NavbarWrapper>
          {isLoginOpen && (
            <LoginDiv>
              <LoginForm
                toggleLogin={toggleLogin}
                setIsActiveHam={setIsActiveHam}
                scrollToSection={scrollToSection}
              />
            </LoginDiv>
          )}
        </>
      )}
    </>
  );
};

