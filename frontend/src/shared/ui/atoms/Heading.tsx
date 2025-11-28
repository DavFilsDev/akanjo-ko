import type { ReactNode } from "react";

interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export function Heading({ children, level = 1, className = "" }: HeadingProps) {
  switch (level) {
    case 1:
      return <h1 className={`font-bold ${className}`}>{children}</h1>;
    case 2:
      return <h2 className={`font-bold ${className}`}>{children}</h2>;
    case 3:
      return <h3 className={`font-bold ${className}`}>{children}</h3>;
    case 4:
      return <h4 className={`font-bold ${className}`}>{children}</h4>;
    case 5:
      return <h5 className={`font-bold ${className}`}>{children}</h5>;
    case 6:
      return <h6 className={`font-bold ${className}`}>{children}</h6>;
    default:
      return <h1 className={`font-bold ${className}`}>{children}</h1>;
  }
}
