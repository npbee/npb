import styled from "react-emotion";

const defaultProps = ["children", "className"];

export default function _styled(element, opts = {}, props = []) {
  if (Array.isArray(opts)) {
    props = [...defaultProps, ...opts];
    opts = {};
  }

  const options = {
    shouldForwardProp: prop => props.includes(prop),
    ...opts,
  };

  return styled(element, options);
}
