import React, { useState } from "react";
import CenteredOverlayForm from "./CenteredOverlayForm";
import { Button, Container, Form, Row } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { groupNameState } from "../state/groupName";
import styled from "styled-components";

export default function CreateGroup() {
  const [validated, setValidated] = useState(false);
  const [validGroupName, setValidGroupName] = useState(false);
  const [groupName, setGroupName] = useRecoilState(groupNameState);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      setValidGroupName(true);
    } else {
      setValidGroupName(false);
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <CenteredOverlayForm>
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <StyledRow>
            <Row className="align-items-start">
              <StyledH2>먼저, 더치페이 할 그룹의 이름을 정해볼까요?</StyledH2>
            </Row>
            <Row className="align-items-center">
              <Form.Group controlId="validationGroupName">
                <Form.Control
                  type="text"
                  required
                  placeholder="2022 제주도 여행"
                  onChange={(e) => setGroupName(e.target.value)}
                />
                <Form.Control.Feedback
                  type="invalid"
                  data-valid={validGroupName}
                >
                  그룹 이름을 입력해 주세요
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="align-items-end">
              <StyledSubmitButton>저장</StyledSubmitButton>
            </Row>
          </StyledRow>
        </Form>
      </Container>
    </CenteredOverlayForm>
  );
}

const StyledH2 = styled.h2`
  font-weight: 700;
  line-height: 35px;
  text-align: right;
  overflow-wrap: break-word;
  word-break: keep-all;
`;

const StyledSubmitButton = styled(Button).attrs({ type: `submit` })`
  background-color: #6610f2;
  border-radius: 8px;
  border: none;
  &:hover {
    background-color: #6610f2;
    filter: brightness(80%);
  }
`;

const StyledRow = styled(Row)`
  align-items: center;
  justify-content: center;
  height: 60vh;
`;
