import '@testing-library/jest-dom';

// jsdom lacks IntersectionObserver (needed by framer-motion useInView)
if (typeof globalThis.IntersectionObserver === 'undefined') {
  class IntersectionObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  // @ts-expect-error jsdom global stub
  globalThis.IntersectionObserver = IntersectionObserverStub;
}
