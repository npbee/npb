import React from "react";
import { Hr, Box, Text, A } from "components/ui/blocks";
import styled from "react-emotion";

const Container = styled.div({
  display: "flex",
  flexDirection: "row",
  position: "relative",
  borderLeft: "3px solid #666",
  ":before": {
    content: '""',
    position: "absolute",
    left: "-1px",
    top: 0,
    transform: "translate(-50%)",
    width: "15px",
    height: "15px",
    borderRadius: "50%",
    backgroundColor: "#666",
  },
  ":last-child:after": {
    content: '""',
    position: "absolute",
    left: "-1px",
    bottom: "0",
    transform: "translate(-50%)",
    width: "15px",
    height: "15px",
    borderRadius: "50%",
    backgroundColor: "#666",
  },
});

const Content = styled(Box)`
  transform: translateY(-6px);
  position: relative;
`;

export default function Experience(props) {
  const { color, name, site, roles, dates, highlights } = props;

  return (
    <Container>
      <Content pb={4} pl={4}>
        <Box is="header" pb={1}>
          <Text is="h2" m={0} color={color}>
            <A href={site} color="inherit" fontWeight="normal">
              {name}
            </A>
          </Text>
          <small>
            {dates[0]} to {dates[1]}
          </small>
        </Box>
        <Hr small />
        <Box mb={3} mt={1}>
          {roles.map(role => (
            <Text key={role.title} my={1}>
              <strong>{role.title}</strong>&nbsp;<span>
                ({role.dates[0]} to {role.dates[1]})
              </span>
            </Text>
          ))}
        </Box>
        <Text my={1}>
          <em>{highlights.join(", ")}</em>
        </Text>
      </Content>
    </Container>
  );
}
