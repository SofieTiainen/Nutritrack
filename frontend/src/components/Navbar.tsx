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
import { MouseEvent, useEffect, useState } from "react";
import { Colors } from "../styles/colors";
import { useNavigate } from "react-router-dom";
import { StyledLink } from "./Navbar.styled";

export const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isActiveNav, setIsActiveNav] = useState(false);
  const [isActiveHam, setIsActiveHam] = useState(false);
  const token =  sessionStorage.getItem('token');
  const navigate = useNavigate()


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
    sessionStorage.removeItem('token');
    navigate('/nutritrack')
  }

  return (
    <>
    {token ? (
      <NavbarWrapper $active={isActiveNav || isActiveHam}>
        <FlexDiv $alignItems="center">
          <DIV $active={isActiveHam} $activeNav={isActiveNav}>
            <HamMenuUl>
            <Styledli
              >
                <StyledLink to={"/nutritrack/dashboard"}>DASHBOARD</StyledLink>
              </Styledli>
              <Styledli
              >
                <StyledLink to={"/nutritrack/clients"}>CLIENTS</StyledLink>
              </Styledli>
              <Styledli
              >
                <StyledLink to={"/nutritrack/registerfoodintake"}>REGISTER FOOD INTAKE</StyledLink>
              </Styledli>
              <Styledli
              >
                <Styledatag
                  $fontSize="18px"
                  $hoverColor={Colors.Green200}
                  onClick={() => {
                    logout()
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
                    marginLeft: "25px", marginRight: '5px'
                  }}
                  color={Colors.Green400}
                />
              ) : (
                <RxHamburgerMenu
                  onClick={handleActiveDiv}
                  cursor={"pointer"}
                  style={{
                    fontSize: isActiveNav ? "24px" : "30px",
                    marginLeft: "25px", marginRight: '5px'
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
                    const event = e as unknown as React.MouseEvent<
                      HTMLAnchorElement,
                      MouseEvent
                    >;
                    scrollToSection(event, "about");
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
                    const event = e as unknown as React.MouseEvent<
                      HTMLAnchorElement,
                      MouseEvent
                    >;
                    scrollToSection(event, "how-it-works");
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
                    const event = e as unknown as React.MouseEvent<
                      HTMLAnchorElement,
                      MouseEvent
                    >;
                    scrollToSection(event, "register");
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
                    const event = e as unknown as React.MouseEvent<
                      HTMLAnchorElement,
                      MouseEvent
                    >;
                    scrollToSection(event, "contact");
                    setIsActiveHam(!isActiveHam);

                  }}
                >
                  CONTACT
                </Styledatag>
              </Styledli>
              <Styledli
              >
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
                    marginLeft: "25px", marginRight: '5px'
                  }}
                  color={Colors.Green400}
                />
              ) : (
                <RxHamburgerMenu
                  onClick={handleActiveDiv}
                  cursor={"pointer"}
                  style={{
                    fontSize: isActiveNav ? "24px" : "30px",
                    marginLeft: "25px", marginRight: '5px'
                  }}
                  color={Colors.Green400}
                />
              )}
              <Styledli>
                <Styledatag
                  href="#video"
                  onClick={(e) => {
                    const event = e as unknown as React.MouseEvent<
                      HTMLAnchorElement,
                      MouseEvent
                    >;
                    scrollToSection(event, "video");
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
                $backgroundImageC1={Colors.Gray500}
                $backgroundImageC2={Colors.Gray600}
              >
                <Styledatag
                  onClick={toggleLogin}
                  $hoverColor={isActiveNav || isActiveHam ? `${Colors.Gray300}` : `${Colors.Gray300}`}
                  $fontSize="12.75px"
                  $color={isActiveNav || isActiveHam ? `${Colors.White}` : `${Colors.White}`}
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
                $backgroundImageC1={Colors.Gray500}
                $backgroundImageC2={Colors.Gray600}
              >
                <Styledatag
                  $hoverColor={isActiveNav || isActiveHam ? `${Colors.Gray300}` : `${Colors.Gray300}`}
                  $fontSize="12.75px"
                  $color={isActiveNav || isActiveHam ? `${Colors.White}` : `${Colors.White}`}
                  href="#register"
                  onClick={(e) => {
                    const event = e as unknown as React.MouseEvent<
                      HTMLAnchorElement,
                      MouseEvent
                    >;
                    scrollToSection(event, "register");
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
          <LoginForm toggleLogin={toggleLogin}></LoginForm>
        </LoginDiv>
      )}
      </>

    )}
      
    </>
  );
};
