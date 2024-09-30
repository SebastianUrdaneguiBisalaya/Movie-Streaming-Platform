import "@testing-library/jest-dom";

class MockIntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];

  observe = (element: Element) => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (element as HTMLImageElement).src =
            (element as HTMLImageElement).dataset.src || "";
        }
      });
    };

    const entry = {
      target: element,
      isIntersecting: true,
    } as IntersectionObserverEntry;

    callback([entry]);
  };

  unobserve() {
    return null;
  }

  disconnect() {
    return null;
  }
}

global.IntersectionObserver = MockIntersectionObserver as any;
