/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import FaqSearch from '@/features/faq-search/ui/FaqSeach';

const mockPush = jest.fn();
let mockSearchParams = new URLSearchParams();

jest.mock('lucide-react', () => ({ X: () => null }));

jest.mock('@/shared/i18n/routing', () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock('next/navigation', () => ({
  useSearchParams: () => mockSearchParams,
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

function renderFaqSearch(searchParams?: URLSearchParams) {
  mockSearchParams = searchParams ?? new URLSearchParams();
  return render(<FaqSearch />);
}

beforeEach(() => {
  mockPush.mockClear();
  mockSearchParams = new URLSearchParams();
});

describe('FaqSearch', () => {
  it('renders empty input when no ?q= in URL', () => {
    renderFaqSearch();
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('pre-fills input from ?q= search param', () => {
    renderFaqSearch(new URLSearchParams('q=автобус'));
    expect(screen.getByRole('textbox')).toHaveValue('автобус');
  });

  it('does not show clear button when input is empty', () => {
    renderFaqSearch();
    expect(screen.queryByRole('button', { name: /x/i })).not.toBeInTheDocument();
  });

  it('shows clear button when input has a value', async () => {
    renderFaqSearch();
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'автобус' } });
    await waitFor(() => {
      expect(screen.getByRole('button', { name: '' })).toBeInTheDocument();
    });
  });

  it('submits and navigates to /faq/search?q= with trimmed value', async () => {
    const { container } = renderFaqSearch();
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '  маршрут  ' } });

    await act(async () => {
      fireEvent.submit(container.querySelector('form')!);
    });

    expect(mockPush).toHaveBeenCalledWith('/faq/search?q=маршрут');
  });

  it('does not submit and does not navigate when input is empty', async () => {
    const { container } = renderFaqSearch();

    await act(async () => {
      fireEvent.submit(container.querySelector('form')!);
    });

    expect(mockPush).not.toHaveBeenCalled();
  });

  it('navigates to /faq/search (no ?q=) when input is cleared by typing', () => {
    renderFaqSearch(new URLSearchParams('q=автобус'));

    fireEvent.change(screen.getByRole('textbox'), { target: { value: '' } });

    expect(mockPush).toHaveBeenCalledWith('/faq/search');
  });

  it('navigates to /faq/search and clears input when X button is clicked', async () => {
    renderFaqSearch(new URLSearchParams('q=маршрут'));

    const clearBtn = await screen.findByRole('button', { name: '' });
    fireEvent.click(clearBtn);

    expect(mockPush).toHaveBeenCalledWith('/faq/search');
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('syncs input value when searchParams change via re-render', () => {
    const { rerender } = renderFaqSearch(new URLSearchParams('q=перший'));
    expect(screen.getByRole('textbox')).toHaveValue('перший');

    mockSearchParams = new URLSearchParams('q=другий');
    rerender(<FaqSearch />);

    expect(screen.getByRole('textbox')).toHaveValue('другий');
  });

  it('keeps query in input after submit (no form.reset)', async () => {
    const { container } = renderFaqSearch();
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'квиток' } });

    await act(async () => {
      fireEvent.submit(container.querySelector('form')!);
    });

    expect(screen.getByRole('textbox')).toHaveValue('квиток');
  });
});
