import { COLORS, SIZES } from "../constants/theme";
import { decode as base64_decode, encode as base64_encode } from "base-64";
import axios from "axios";
import { Buffer } from "buffer";
import {
  DropdownMenu,
  DropdownItem,
  Dropdown,
  DropdownToggle,
} from "reactstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faBarsStaggered,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Compiler = styled.div`
  border: 2px solid ${COLORS.black};
  border-radius: 4px;
  position: relative;
  background-color: #ffffff;
  width: 85%;
  @media (max-width: 400px) {
    width: 90%;
  }
`;

const ToolKit = styled.div`
  border-bottom: 1px solid ${COLORS.black};
  position: relative;
`;

const RunButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: transparent;
  padding: 6px 18px;
  border: 1.6px solid ${COLORS.black};
  font-size: calc(${SIZES.font}px + 1px);
  font-weight: 700;
  border-radius: 4px;
`;

const Input = (props) => {
  const [dropdownOpen, setDropDownOpen] = useState(false);

  const [dropValue, setDropValue] = useState("C");
  const [activeLan, setActiveLan] = useState(50);

  const toggle = () => {
    setDropDownOpen(!dropdownOpen);
  };

  const runCode = async () => {
    window.scrollTo(0, document.body.scrollHeight);
    props.setOutput("Compiling! This may take a while please wait");
    var check = "";
    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": "20858d247amshd135131c376d1e8p173f4fjsn1640ccd1b841",
      },
      data: `{"language_id":${activeLan},"source_code":"${base64_encode(
        props.code
      )}","stdin":"${base64_encode(props.input)}"}`,
    };

    await axios
      .request(options)
      .then(function (response) {
        check = response.data;
      })
      .catch(function (error) {
        console.error(error);
      });

    const options2 = {
      method: "GET",
      url: `https://judge0-ce.p.rapidapi.com/submissions/${check.token}`,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "X-RapidAPI-Key": "20858d247amshd135131c376d1e8p173f4fjsn1640ccd1b841",
      },
    };

    await axios
      .request(options2)
      .then(function (response) {
        if (response.data.status.id === 6) {
          props.setOutput(
            Buffer.from(response.data.compile_output, "base64").toString()
          );
          props.setError(true);
        } else if (response.data.status.id === 3) {
          props.setOutput(base64_decode(response.data.stdout));
          props.setError(false);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div
      className="row justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <svg
        width="1000"
        height="1000"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", zIndex: "-1000" }}
      >
        <defs>
          <radialGradient id="radialGradientId" r="100%" cx="0%" cy="77%">
            <stop offset="0%" stopColor="#f4f4f4" />
            <stop offset="100%" stopColor="#f4f4f4" />
          </radialGradient>

          <clipPath id="shape">
            <path
              fill="currentColor"
              d="M899.5,609Q801,718,705,777Q609,836,500.5,834Q392,832,280,786.5Q168,741,125.5,620.5Q83,500,158.5,403.5Q234,307,311.5,232Q389,157,513.5,115.5Q638,74,736,166Q834,258,916,379Q998,500,899.5,609Z"
            ></path>
          </clipPath>
        </defs>

        <g clipPath="url(#shape)">
          <path
            fill="url(#radialGradientId)"
            d="M899.5,609Q801,718,705,777Q609,836,500.5,834Q392,832,280,786.5Q168,741,125.5,620.5Q83,500,158.5,403.5Q234,307,311.5,232Q389,157,513.5,115.5Q638,74,736,166Q834,258,916,379Q998,500,899.5,609Z"
          />
        </g>
      </svg>
      <Compiler
        className="col-12 px-0"
        style={{
          transition: "0.5s ease-in-out",
          backgroundColor: `${!props.dark ? "#333333" : "#ffffff"}`,
          color: `${!props.dark ? "white" : COLORS.black}`,
        }}
      >
        <ToolKit
          className="row justify-content-between px-4 py-3 mx-0"
          style={{
            backgroundColor: `${!props.dark ? "#333333" : "white"}`,
          }}
        >
          <div className="col-lg-auto col-md-auto col-sm-auto my-auto">
            <p
              className="my-0"
              style={{ fontSize: `${SIZES.font}px`, fontWeight: 500 }}
            >
              <FontAwesomeIcon
                icon={faBarsStaggered}
                style={{ cursor: "pointer" }}
              />{" "}
              &nbsp; CODE HERE
            </p>
          </div>
          <div className="col-lg-auto col-md-auto col-sm-auto my-3 my-lg-0 my-md-0 my-sm-0">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <Dropdown
                  isOpen={dropdownOpen}
                  toggle={toggle}
                  className="w-100"
                >
                  <DropdownToggle
                    caret
                    style={{
                      background: `${COLORS.baseGreen}`,
                      fontWeight: 500,
                      fontSize: `${SIZES.font}px`,
                      transition: "0.5s ease-in-out",
                      backgroundColor: `${!props.dark ? "#575757" : "#ffffff"}`,
                      color: `${!props.dark ? "white" : COLORS.black}`,
                    }}
                  >
                    {dropValue}
                  </DropdownToggle>

                  <DropdownMenu style={{ fontSize: `${SIZES.font}px` }}>
                    <DropdownItem
                      value={50}
                      onClick={() => {
                        setDropValue("C");
                        setActiveLan(50);
                        props.setCode(
                          `#include <stdio.h>\n\nint main(void) {\n\tprintf("Hello World!");\n\treturn 0;\n}`
                        );
                      }}
                    >
                      C
                    </DropdownItem>
                    <DropdownItem
                      value={54}
                      onClick={() => {
                        setDropValue("Cpp");
                        setActiveLan(54);
                        props.setCode(
                          `#include <iostream>\nusing namespace std;\n\nint main()\n{\n\tcout<<"Hello World!";\n\treturn 0;\n}`
                        );
                      }}
                    >
                      Cpp
                    </DropdownItem>
                    <DropdownItem
                      value={62}
                      onClick={() => {
                        setDropValue("Java");
                        setActiveLan(62);
                        props.setCode(
                          `public class Main\n{\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}`
                        );
                      }}
                    >
                      Java
                    </DropdownItem>
                    <DropdownItem
                      value={71}
                      onClick={() => {
                        setDropValue("Python");
                        setActiveLan(71);
                        props.setCode(`print("Hello World!")`);
                      }}
                    >
                      Python
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className="col-auto">
                <FontAwesomeIcon
                  icon={props.dark ? faSun : faMoon}
                  style={{ cursor: "pointer" }}
                  onClick={() => props.setDark(!props.dark)}
                />
              </div>
            </div>
          </div>
        </ToolKit>
        <textarea
          name=""
          id=""
          cols="auto"
          rows="auto"
          className="my-auto form-control shadow-none"
          value={props.code}
          onChange={({ target }) => props.setCode(target.value)}
          spellCheck={false}
          style={{
            width: "100%",
            minHeight: "50vh",
            outline: "none",
            border: "none",
            padding: "10px",
            fontSize: "14px",
            resize: "none",
            transition: "0.5s ease-in-out",
            backgroundColor: `${!props.dark ? "#575757" : "#ffffff"}`,
            color: `${!props.dark ? "white" : COLORS.black}`,
          }}
        ></textarea>
        <RunButton
          onClick={runCode}
          style={{
            transition: "0.5s ease-in-out",
            backgroundColor: `${!props.dark ? "#333333" : "#ffffff"}`,
            color: `${!props.dark ? "white" : COLORS.black}`,
            border: `1.6px solid ${!props.dark ? "white" : "black"}`,
          }}
        >
          Run
        </RunButton>
      </Compiler>
    </div>
  );
};

export default Input;
