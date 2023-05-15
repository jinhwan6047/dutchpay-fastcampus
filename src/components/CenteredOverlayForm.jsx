import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import OverlayWrapper from "./shared/OverlayWrapper";

export default function CenteredOverlayForm({ children }) {
  return (
    <StyledCentralizedContainer>
      <StyledHeader>Dutch Pay</StyledHeader>

      <OverlayWrapper>{children}</OverlayWrapper>
    </StyledCentralizedContainer>
  );
}

const StyledHeader = styled.h1`
  font-weight: 700;
  line-height: 35px;

  text-align: right;
  overflow-wrap: break-word;
  word-break: keep-all;
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
