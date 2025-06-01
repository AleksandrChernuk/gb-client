// import { render, screen } from '@testing-library/react';
// import Logo from '../Logo';
// import React from 'react';

// jest.mock('@/i18n/routing', () => ({
//   Link: (props: React.PropsWithChildren<React.AnchorHTMLAttributes<HTMLAnchorElement>>) => (
//     <a {...props}>{props.children}</a>
//   ),
// }));

// jest.mock('@/components/icons/IconLogo', () => ({
//   IconLogo: () => <svg data-testid="icon-logo" />,
// }));

// describe('Logo component', () => {
//   it('renders the logo with Green and Bus text', () => {
//     render(<Logo />);
//     expect(screen.getByText('Green')).toBeInTheDocument();
//     expect(screen.getByText('Bus')).toBeInTheDocument();
//     expect(screen.getByTestId('icon-logo')).toBeInTheDocument();
//   });

//   it('renders link to home page', () => {
//     render(<Logo />);
//     const link = screen.getByRole('link');
//     expect(link).toHaveAttribute('href', '/');
//     expect(link).toHaveTextContent('Green');
//     expect(link).toHaveTextContent('Bus');
//   });
// });
