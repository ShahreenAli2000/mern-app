import React from "react";
import './Info.css';
import { Row, Col } from 'react-bootstrap';
import axios from "axios";
import { URL } from "../uri";

function Info(props) {

  return (
    <div>
      <Row>
        <Col>
          <span className="number">{props.number}</span>
          <span className="text">{props.text}</span>
        </Col>
        <Col style={{ display: "flex", justifyContent: "flex-end" }}>
          <span className="icon">{props.icon}</span>
        </Col>
      </Row>
    </div>
  );
}

export default Info;
