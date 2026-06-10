import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';

const TRAINER_SIGNUP = 'https://trainer.evofit.io/get-started';
const MEALS_SIGNUP = 'https://meals.evofit.io/get-started';

describe('Navbar', () => {
  it('renders Blog link to /blog', () => {
    render(<Navbar />);
    const blogLinks = screen.getAllByRole('link', { name: /blog/i });
    const blogLink = blogLinks.find((el) => el.getAttribute('href') === '/blog');
    expect(blogLink).toBeDefined();
    expect(blogLink).toHaveAttribute('href', '/blog');
  });

  it('renders a direct Get Trainer CTA to the trainer sales page', () => {
    render(<Navbar />);
    const links = screen.getAllByRole('link', { name: /get trainer/i });
    expect(links.length).toBeGreaterThan(0);
    links.forEach((l) => expect(l).toHaveAttribute('href', TRAINER_SIGNUP));
  });

  it('renders a direct Get Meals CTA to the meals sales page', () => {
    render(<Navbar />);
    const links = screen.getAllByRole('link', { name: /get meals/i });
    expect(links.length).toBeGreaterThan(0);
    links.forEach((l) => expect(l).toHaveAttribute('href', MEALS_SIGNUP));
  });

  it('renders both direct CTAs in the mobile menu', () => {
    render(<Navbar />);
    fireEvent.click(screen.getByLabelText(/toggle menu/i));
    expect(screen.getAllByRole('link', { name: /get trainer/i }).length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByRole('link', { name: /get meals/i }).length).toBeGreaterThanOrEqual(2);
  });

  it('has no link to the email-capture anchor', () => {
    const { container } = render(<Navbar />);
    fireEvent.click(screen.getByLabelText(/toggle menu/i));
    const anchorLinks = Array.from(container.querySelectorAll('a')).filter(
      (a) => a.getAttribute('href') === '/#get-started'
    );
    expect(anchorLinks).toHaveLength(0);
  });
});
