import { Link, useLocation, useNavigate } from 'react-router-dom';
import { scrollToId } from '../../lib/scroll';

/**
 * One link component for the whole site:
 *  - `to="/#section"` scrolls smoothly when already on the homepage, otherwise routes there.
 *  - `to="/page"` is a client-side route.
 *  - `href` is an external/official page and opens in a new tab.
 */
export default function SmartLink({ to, href, children, onClick, ...rest }) {
  const location = useLocation();
  const navigate = useNavigate();

  if (href) {
    const external = /^https?:/.test(href) || href.endsWith('.pdf');
    return (
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        onClick={onClick}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const [path, hash] = (to || '/').split('#');
  const targetPath = path || '/';

  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey) return;
    if (hash) {
      e.preventDefault();
      if (location.pathname === targetPath) {
        scrollToId(hash);
        window.history.replaceState(null, '', `#${hash}`);
      } else {
        navigate(`${targetPath}#${hash}`);
      }
    }
  };

  return (
    <Link to={to} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
