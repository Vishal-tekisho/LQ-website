import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';

/**
 * Context to share isInView state with sub-components
 * without prop drilling. Defaults to true (animations run)
 * so components work normally when not wrapped in a provider.
 */
export const InViewContext = createContext(true);
export const useIsInView = () => useContext(InViewContext);

/**
 * Hook that tracks whether an element is in the viewport.
 * Used to pause expensive infinite animations when off-screen.
 *
 * @param threshold - IntersectionObserver threshold (0-1)
 * @param rootMargin - Extra margin around viewport to start animations slightly before visible
 * @returns { ref, isInView } - attach ref to the container element
 */
export function useInViewPause(threshold = 0.05, rootMargin = '200px') {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isInView };
}

/**
 * Returns a repeat value for framer-motion transitions.
 * When the element is in view, returns Infinity; otherwise 0.
 */
export function useAnimRepeat(isInView: boolean) {
  return useCallback(
    (defaultRepeat: number = Infinity) => (isInView ? defaultRepeat : 0),
    [isInView]
  );
}
