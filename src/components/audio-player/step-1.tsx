import { Container, trackUrl } from "./shared";

export function Step1() {
  return (
    <Container>
      <audio src={trackUrl} controls preload="none" />
    </Container>
  );
}
