// Registers jest-dom's DOM matchers (toBeInTheDocument, toHaveTextContent, …)
// on Vitest's `expect`. Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/vitest';

// jsdom doesn't implement IntersectionObserver, but AnimatedSection (via
// useInView) relies on it. Stub it out so components using scroll-reveal
// animations can render in tests.
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '';
  readonly scrollMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  observe = () => undefined;
  unobserve = () => undefined;
  disconnect = () => undefined;
  takeRecords = () => [];
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});
