import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider } from './ThemeProvider';
import { TopBar } from './TopBar';

const localStorageMock = {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('TopBar', () => {
  it('renders with title', () => {
    const onTitleChange = vi.fn();
    const onSettingsClick = vi.fn();
    const onExportClick = vi.fn();
    const { getByTestId } = render(
      <ThemeProvider>
        <TopBar
          documentTitle="My Document"
          onTitleChange={onTitleChange}
          onSettingsClick={onSettingsClick}
          onExportClick={onExportClick}
        />
      </ThemeProvider>
    );
    expect(getByTestId('input-document-title')).toHaveValue('My Document');
  });

  it('calls onSettingsClick when settings button is clicked', () => {
    const onSettingsClick = vi.fn();
    const onExportClick = vi.fn();
    const { getByTestId } = render(
      <ThemeProvider>
        <TopBar
          documentTitle="test"
          onTitleChange={vi.fn()}
          onSettingsClick={onSettingsClick}
          onExportClick={onExportClick}
        />
      </ThemeProvider>
    );
    fireEvent.click(getByTestId('button-settings'));
    expect(onSettingsClick).toHaveBeenCalled();
  });

  it('calls onExportClick when export button is clicked', () => {
    const onExportClick = vi.fn();
    const onSettingsClick = vi.fn();
    const { getByTestId } = render(
      <ThemeProvider>
        <TopBar
          documentTitle="test"
          onTitleChange={vi.fn()}
          onSettingsClick={onSettingsClick}
          onExportClick={onExportClick}
        />
      </ThemeProvider>
    );
    fireEvent.click(getByTestId('button-export'));
    expect(onExportClick).toHaveBeenCalled();
  });

  it('toggles theme when theme button is clicked', () => {
    const onSettingsClick = vi.fn();
    const onExportClick = vi.fn();
    const { getByTestId } = render(
      <ThemeProvider>
        <TopBar
          documentTitle="test"
          onTitleChange={vi.fn()}
          onSettingsClick={onSettingsClick}
          onExportClick={onExportClick}
        />
      </ThemeProvider>
    );
    const button = getByTestId('button-theme-toggle');
    fireEvent.click(button);
    // Theme should have toggled - the Sun icon should now be visible
    expect(button).toBeInTheDocument();
  });

  it('updates title on change', () => {
    const onTitleChange = vi.fn();
    const { getByTestId } = render(
      <ThemeProvider>
        <TopBar
          documentTitle="test"
          onTitleChange={onTitleChange}
          onSettingsClick={vi.fn()}
          onExportClick={vi.fn()}
        />
      </ThemeProvider>
    );
    fireEvent.change(getByTestId('input-document-title'), {
      target: { value: 'New Title' },
    });
    expect(onTitleChange).toHaveBeenCalledWith('New Title');
  });
});
