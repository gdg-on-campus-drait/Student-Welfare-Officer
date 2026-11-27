import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToId } from './scroll';

/** Programmatic equivalent of <SmartLink>: go to `{ to }` (route/anchor) or open `{ href }`. */
export function useGo() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return useCallback(
    ({ to, href }) => {
      if (href) {
        window.open(href, '_blank', 'noopener,noreferrer');
        return;
      }
      const [path, hash] = (to || '/').split('#');
      const target = path || '/';
      if (hash && pathname === target) {
        scrollToId(hash);
      } else {
        navigate(hash ? `${target}#${hash}` : target);
      }
    },
    [navigate, pathname]
  );
}
