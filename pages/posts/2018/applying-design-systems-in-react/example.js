import React from "react";

const Container = props => (
  <div
    style={{
      background: "#fff",
      padding: "12px",
      border: "1px solid #d9d9d9",
      borderRadius: "3px",
    }}
    {...props}
  />
);

const InputComponent = props => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
    }}
    {...props}
  />
);

const Label = props => (
  <label
    style={{
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "0.03em",
      marginBottom: "12px",
    }}
    {...props}
  />
);

const Input = props => (
  <input
    style={{
      marginBottom: "8px",
      padding: "8px",
      borderRadius: "3px",
      border: "1px solid #d9d9d9",
      fontSize: "1rem",
      color: "#a0a0a0",
      fontFamily: "avenir next, avenir, sans-serif",
    }}
    {...props}
  />
);

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
