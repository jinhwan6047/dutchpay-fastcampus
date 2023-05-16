import React from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import styled from "styled-components";
import OverlayWrapper from "./shared/OverlayWrapper";

export default function CenteredOverlayForm({
  title,
  children,
  validated,
  handleSubmit,
}) {
  return (
    <StyledCentralizedContainer>
      <StyledLogo>Dutch Pay</StyledLogo>
      <OverlayWrapper>
        <Container>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <StyledCentralizedContent>
              <Row className="align-items-start">
                <StyledTitle>{title}</StyledTitle>
              </Row>
              <Row className="align-items-center">{children}</Row>
              <Row className="align-items-end">
                <StyledSubmitButton>저장</StyledSubmitButton>
              </Row>
            </StyledCentralizedContent>
          </Form>
        </Container>
      </OverlayWrapper>
    </StyledCentralizedContainer>
  );
}

const StyledLogo = styled.h1`
  font-weight: 700;
  line-height: 35px;

  text-align: right;
  overflow-wrap: break-word;
  word-break: keep-all;
  color: #6610f2;
`;

const StyledCentralizedContainer = styled(Container)`
  width: 50vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 10px;
`;

const StyledTitle = styled.h2`
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

const StyledCentralizedContent = styled(Row)`
  align-items: center;
  justify-content: center;
  height: 60vh;
`;
