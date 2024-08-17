import { render, screen, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, test, expect, vi, afterEach } from 'vitest';
import ShortLinkForm from '@/app/(homepage)/_components/short-link-form';

describe('<ShortLinkForm />', () => {
  const mockShortenUrl = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('shows error message on invalid URL input', async () => {
    render(<ShortLinkForm shortenUrl={mockShortenUrl} />);

    const input = screen.getByPlaceholderText('Your long link goes here');
    const button = screen.getByText('Trim it');

    fireEvent.change(input, { target: { value: 'invalid-url' } });
    fireEvent.click(button);

    expect(
      await screen.findByText('Please enter a valid link')
    ).toBeInTheDocument();
    expect(mockShortenUrl).not.toHaveBeenCalled();
  });

  test('calls shortenUrl function on valid URL input', async () => {
    mockShortenUrl.mockResolvedValue({
      message: 'success',
      data: { shortUrl: 'sQw3f' },
    });

    render(<ShortLinkForm shortenUrl={mockShortenUrl} />);

    const input = screen.getByPlaceholderText('Your long link goes here');
    const button = screen.getByText('Trim it');

    fireEvent.change(input, { target: { value: 'https://example.com' } });
    fireEvent.click(button);

    await screen.findByText('Trimming it...');

    expect(mockShortenUrl).toHaveBeenCalled();
    expect(mockShortenUrl).toHaveBeenCalledWith('https://example.com');

    const viewShortLink = await screen.findByTestId('view-short-link');
    expect(viewShortLink).toBeInTheDocument();

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    const shortUrlInput = within(viewShortLink).getByRole('textbox');
    expect(shortUrlInput).toHaveValue(`${siteUrl}/sQw3f`);
  });

  test('displays loading state during form submission', async () => {
    mockShortenUrl.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                message: 'success',
                data: { shortUrl: 'sQw3f' },
              }),
            1000
          )
        )
    );

    render(<ShortLinkForm shortenUrl={mockShortenUrl} />);

    const input = screen.getByPlaceholderText('Your long link goes here');
    const button = screen.getByText('Trim it');

    fireEvent.change(input, { target: { value: 'https://example.com' } });
    fireEvent.click(button);

    expect(await screen.findByText('Trimming it...')).toBeInTheDocument();
  });
});
