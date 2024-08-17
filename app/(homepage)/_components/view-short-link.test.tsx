import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect, vi } from 'vitest';
import ViewShortLink from '@/app/(homepage)/_components/view-short-link';

const mockToast = vi.fn();
vi.mock('@/components/ui/use-toast', () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}));

describe('<ViewShortLink />', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(),
      },
    });

    mockToast.mockClear();
  });

  test('renders short URL when provided', () => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    render(<ViewShortLink shortUrl="sQw3f" />);

    const shortLinkInput = screen.getByRole('textbox');
    expect(shortLinkInput).toHaveValue(`${siteUrl}/sQw3f`);
  });

  test('copies the short link to the clipboard when the button is clicked', () => {
    render(<ViewShortLink shortUrl="abc123" />);

    const copyButton = screen.getByRole('button');
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_SITE_URL}/abc123`
    );

    expect(mockToast).toHaveBeenCalledWith({
      variant: 'success',
      title: 'Short Link Copied',
      description: 'Feel free to share it online',
    });
  });

  test('does not render anything when shortUrl is undefined', () => {
    const { container } = render(<ViewShortLink shortUrl={undefined} />);

    expect(container.firstChild).toBeNull();
  });
});
