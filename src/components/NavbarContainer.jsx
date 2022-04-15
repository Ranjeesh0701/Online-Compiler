import { COLORS, SIZES } from "../constants/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faRightToBracket,
  faArrowUpFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import {
  Row,
  Col,
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from "reactstrap";

import styled from "styled-components";
import { useState } from "react";

const UploadButton = styled.button`
  background-color: transparent;
  padding: 6px 18px;
  border: 1.6px solid ${COLORS.black};
  font-size: calc(${SIZES.font}px + 1px);
  font-weight: 700;
  position: relative;
  border-radius: 4px;
  color: black;
`;

const SvgContainer = styled.div`
  top: -150px;
  @media (max-width: 1200px) {
    top: -100px;
  }
  @media (max-width: 900px) {
    top: -50px;
  }
  @media (max-width: 767px) {
    top: 0px;
  }
`;

const NavbarContainer = () => {
  const [isOpen, setIsOpne] = useState(false);

  const toggle = () => {
    setIsOpne(!isOpen);
  };

  return (
    <div className="overflow-hidden">
      <SvgContainer
        style={{
          position: "absolute",
          width: "100%",
          // top: "-100px",
          zIndex: "-1",
        }}
      >
        <svg
          id="svg"
          width="100%"
          height="100%"
          viewBox="0 0 1440 400"
          xmlns="http://www.w3.org/2000/svg"
          className="transition duration-300 ease-in-out delay-150"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="5%" stopColor="#0bdb90"></stop>
              <stop offset="95%" stopColor="#634fff"></stop>
            </linearGradient>
          </defs>
          <path
            d="M 0,600 C 0,600 0,300 0,300 C 93.10714285714286,252.03571428571428 186.21428571428572,204.07142857142858 325,215 C 463.7857142857143,225.92857142857142 648.25,295.75000000000006 764,321 C 879.75,346.24999999999994 926.7857142857142,326.92857142857144 1028,316 C 1129.2142857142858,305.07142857142856 1284.607142857143,302.5357142857143 1440,300 C 1440,300 1440,600 1440,600 Z"
            stroke="none"
            strokeWidth="0"
            fill="url(#gradient)"
            className="transition-all duration-300 ease-in-out delay-150 path-0"
            transform="rotate(-180 720 300)"
          ></path>
        </svg>
      </SvgContainer>
      <Navbar
        light
        expand="md"
        className="px-4 py-2"
        style={{
          transition: "0.2s linear",
          backgroundColor: `${isOpen ? "white" : "transparent"}`,
        }}
      >
        <a
          href="/"
          style={{
            textDecoration: "none",
            transition: "0.2s linear",
            color: `${COLORS.black}`,
            fontSize: `calc(${SIZES.font}px + 1px)`,
            fontWeight: "700",
          }}
        >
          <Row style={{ color: "white" }}>
            <Col xs="auto">
              <FontAwesomeIcon icon={faCode} />
            </Col>
            <Col xs="auto" className="px-0">
              <p className="my-0">CODE Compiler</p>
            </Col>
          </Row>
        </a>
        <NavbarToggler
          onClick={toggle}
          style={{
            fontSize: `calc(${SIZES.font}px - 1px)`,
            border: "1px solid black",
          }}
        />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem className="my-lg-auto my-md-auto my-4 me-4">
              <a
                href="/"
                style={{
                  textDecoration: "none",
                  color: `${COLORS.black}`,
                  fontSize: `calc(${SIZES.font}px)`,
                  fontWeight: 500,
                }}
              >
                <p className="my-0">How it works</p>
              </a>
            </NavItem>
            <NavItem className="my-lg-auto my-md-auto my-4 me-4">
              <a
                href="/"
                style={{
                  textDecoration: "none",
                  color: `${COLORS.black}`,
                  fontSize: `calc(${SIZES.font}px)`,
                  fontWeight: 500,
                }}
              >
                <p className="my-0">Team behind</p>
              </a>
            </NavItem>
            <NavItem className="my-lg-auto my-md-auto my-4 me-4">
              <a
                href="/"
                style={{
                  textDecoration: "none",
                  color: `${COLORS.black}`,
                  fontSize: `calc(${SIZES.font}px)`,
                  fontWeight: 500,
                }}
              >
                <p className="my-0">
                  <FontAwesomeIcon icon={faRightToBracket} />
                  &nbsp; Log in
                </p>
              </a>
            </NavItem>
            <NavItem className="my-auto" style={{ color: "black" }}>
              <UploadButton>
                <FontAwesomeIcon icon={faArrowUpFromBracket} />
                &nbsp; UPLOAD CODE
              </UploadButton>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavbarContainer;
