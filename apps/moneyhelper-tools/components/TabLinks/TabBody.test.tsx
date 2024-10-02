import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TabBody } from './TabBody';

jest.mock('assets/images/bookmark.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="bookmark-icon" />,
}));

describe('TabBody', () => {
  const defaultProps = {
    heading: 'Test Heading',
  };

  it('renders without errors', () => {
    render(<TabBody {...defaultProps}>Test Content</TabBody>);
    expect(screen.getByText('Test Heading')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
