import { render, screen } from '@testing-library/react';
import Inventory from './Inventory';

describe('Inventory Component test', () => {
  test('Image must have src and alt ', () => {
    render(<Inventory/>);
    const logo = screen.getByRole('img');
    // expect(logo).toHaveAttribute('src', '/logo.svg');
    expect(logo).toBeInTheDocument('alt', 'ProductImg');

  });
});
