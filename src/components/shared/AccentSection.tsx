import { ReactNode } from 'react';
import { Container } from './Container';

type Props = {
  children: ReactNode;
};

export default function AccentSection({ children }: Props) {
  return (
    <section className="bg-bg_green my-8 ">
      <Container size="l" className="py-8">
        {children}
      </Container>
    </section>
  );
}
