import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FullWidthImage from './FullWidthImage';

describe('FullWidthImage', () => {
  const baseProps = {
    image: '/images/test.png',
    alt: 'Test image',
    label: 'Label',
    title: 'Title',
    description: 'Description',
  };

  it('renders the primary CTA with its href', () => {
    render(
      <FullWidthImage
        {...baseProps}
        cta={{ text: 'Primary CTA', href: 'https://trainer.evofit.io/get-started' }}
      />
    );
    expect(screen.getByRole('link', { name: /primary cta/i })).toHaveAttribute(
      'href',
      'https://trainer.evofit.io/get-started'
    );
  });

  it('renders the secondary CTA with its href when provided', () => {
    render(
      <FullWidthImage
        {...baseProps}
        cta={{ text: 'Primary CTA', href: 'https://trainer.evofit.io/get-started' }}
        secondaryCta={{ text: 'Learn more', href: '/trainer' }}
      />
    );
    expect(screen.getByRole('link', { name: /learn more/i })).toHaveAttribute('href', '/trainer');
  });

  it('renders no secondary CTA when not provided', () => {
    render(
      <FullWidthImage {...baseProps} cta={{ text: 'Primary CTA', href: '/x' }} />
    );
    expect(screen.getAllByRole('link')).toHaveLength(1);
  });
});
