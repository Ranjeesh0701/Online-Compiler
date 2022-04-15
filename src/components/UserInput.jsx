import { COLORS, SIZES } from "../constants/theme";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTerminal } from "@fortawesome/free-solid-svg-icons";

const UserInputBox = styled.div`
  border: 2px solid ${COLORS.black};
  border-radius: 4px;
  position: relative;
  background-color: #ffffff;
  width: 90%;
  margin: auto;
`;

const ToolKit = styled.div`
  border-bottom: 1px solid ${COLORS.black};
  position: relative;
`;

const UserInput = (props) => {
  return (
    <UserInputBox
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
        <div className="col-auto my-auto">
          <p
            className="my-0"
            style={{ fontSize: `${SIZES.font}px`, fontWeight: 500 }}
          >
            <FontAwesomeIcon icon={faTerminal} />
            &nbsp; USER INPUT
          </p>
        </div>
        <div className="col-auto">
          <div className="row align-items-center">
            {/* <div className="col">
              <input type="range" />
            </div> */}
          </div>
        </div>
      </ToolKit>
      <textarea
        name=""
        id=""
        cols="auto"
        rows="auto"
        className="my-auto form-control shadow-none"
        value={props.input}
        spellCheck={false}
        onChange={({ target }) => props.setInput(target.value)}
        style={{
          width: "100%",
          minHeight: "30vh",
          outline: "none",
          padding: "10px",
          border: "none",
          fontSize: "14px",
          resize: "none",
          transition: "0.5s ease-in-out",
          backgroundColor: `${!props.dark ? "#575757" : "#ffffff"}`,
          color: `${!props.dark ? "white" : COLORS.black}`,
        }}
      ></textarea>
    </UserInputBox>
  );
};

export default UserInput;
