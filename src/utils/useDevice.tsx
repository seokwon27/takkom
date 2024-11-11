import { useState, useEffect } from "react";

// 간단한 디바운스 함수
const debounce = (func: (...args: unknown[]) => void, delay: number) => {
  let timer: NodeJS.Timeout;
  return (...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const handleResize = debounce(() => {
      setMatches(media.matches);
    }, 300); // 300ms 지연 후 업데이트

    // 초기 크기 설정
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [query]);

  return matches;
};

// 어떤 디바이스인지 반환하는 함수
const useDevice = (): string => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  // const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)');
  // const isDesktop = useMediaQuery('(min-width: 1025px)');

  if (isMobile) return "mobile";
  // if (isTablet) return 'Tablet';
  // if (isDesktop) return 'Desktop';
  return "desktop";
};

export default useDevice;