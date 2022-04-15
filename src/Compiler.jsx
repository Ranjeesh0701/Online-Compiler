import "./Compiler.css";
import NavbarContainer from "./components/NavbarContainer";
import Input from "./components/Input";
import { Row, Col } from "reactstrap";
import { useState } from "react";
import UserInput from "./components/UserInput";
import Output from "./components/Output";

function Compiler() {
  const [dark, setDark] = useState(true);

  const [code, setCode] = useState(`#include <stdio.h>

  int main(void) {
    printf("Hello World!");
    return 0;
  }`);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const [error, setError] = useState(false);

  return (
    <div className="App">
      <NavbarContainer />

      <div className="overflow-hidden" style={{ minHeight: "100vh" }}>
        <Row>
          <Col lg="7" className="px-lg-5 px-md-5 px-sm-5 px-5">
            <Input
              dark={dark}
              setDark={setDark}
              code={code}
              input={input}
              setCode={setCode}
              setOutput={setOutput}
              setError={setError}
            />
          </Col>
          <Col lg="5">
            <Row className="py-5 px-lg-5 px-md-5 px-sm-5 px-4 pb-5">
              <Col xs="12">
                <UserInput input={input} setInput={setInput} dark={dark} />
              </Col>
            </Row>
            <Row className="px-lg-5 px-md-5 px-sm-5 px-4 pb-5">
              <Col xs="12">
                <Output
                  output={output}
                  setOutput={setOutput}
                  error={error}
                  dark={dark}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Compiler;
