import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EmailCTA from './EmailCTA';

const TRAINER_SIGNUP = 'https://trainer.evofit.io/get-started';
const MEALS_SIGNUP = 'https://meals.evofit.io/get-started';

describe('EmailCTA', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: async () => ({ success: true }),
      })
    );
  });

  async function submitEmail() {
    render(<EmailCTA title="T" subtitle="S" buttonText="Start Building" />);
    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /start building/i }));
    await screen.findByText(/you're in/i);
  }

  it('shows the success message after submit', async () => {
    await submitEmail();
    expect(screen.getByText(/you're in/i)).toBeInTheDocument();
  });

  it('hands off to the trainer sales page after submit', async () => {
    await submitEmail();
    expect(screen.getByRole('link', { name: /get evofit trainer/i })).toHaveAttribute(
      'href',
      TRAINER_SIGNUP
    );
  });

  it('hands off to the meals sales page after submit', async () => {
    await submitEmail();
    expect(screen.getByRole('link', { name: /get evofit meals/i })).toHaveAttribute(
      'href',
      MEALS_SIGNUP
    );
  });
});
