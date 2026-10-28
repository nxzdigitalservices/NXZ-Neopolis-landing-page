import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  onNavigate?: (url: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({
  href,
  onNavigate,
  children,
  className = '',
  onClick,
  ...rest
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If user holds Ctrl, Cmd, Shift, or Alt, or middle clicks, let browser handle normal new-tab behavior
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      if (onClick) onClick(e);
      return;
    }

    // Otherwise, prevent full page reload and perform client-side pushState navigation
    e.preventDefault();
    if (onClick) onClick(e);

    if (onNavigate) {
      onNavigate(href);
    } else if (typeof window !== 'undefined') {
      window.history.pushState({}, '', href);
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
};
