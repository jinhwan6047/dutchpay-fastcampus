import React from "react";
import CenteredOverlayForm from "./CenteredOverlayForm";
import testImg from "./img/testImg.jpg";

export default function CreateGroup() {
  return (
    <div>
      Create Group component
      <img src={testImg} style={{ width: "200px", height: "300px" }} />
      <CenteredOverlayForm />
    </div>
  );
}
