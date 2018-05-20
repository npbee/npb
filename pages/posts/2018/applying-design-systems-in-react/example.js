import React from "react";
import styled from "react-emotion";

const Container = styled.div`
  background: #fff;
  padding: 12px;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
`;

const InputComponent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  margin-bottom: 12px;
`;

const Input = styled.input`
  margin-bottom: 8px;
  padding: 8px;
  border-radius: 3px;
  border: 1px solid #d9d9d9;
  font-size: 1rem;
  color: #a0a0a0;
  font-family: avenir next, avenir, sans-serif;
`;

export default function Example() {
  return (
    <Container>
      <InputComponent>
        <Label>A Label</Label>
        <Input placeholder="First Name" />
        <Input placeholder="Last Name" />
      </InputComponent>
    </Container>
  );
}
