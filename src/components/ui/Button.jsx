import SmartLink from './SmartLink';

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ease-out focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 disabled:opacity-50';

const variants = {
  primary: 'bg-navy-900 text-white hover:bg-navy-700 shadow-[0_12px_30px_-14px_rgba(11,30,64,0.7)]',
  light: 'bg-white text-navy-900 hover:bg-accent-50 shadow-[0_12px_30px_-14px_rgba(0,0,0,0.5)]',
  outline: 'border border-navy-200 bg-white text-navy-900 hover:border-navy-900',
  glass: 'border border-white/40 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-navy-950',
  ghost: 'text-navy-900 hover:bg-navy-50',
};

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-sm sm:text-[15px]',
};

export default function Button({ variant = 'primary', size = 'md', className = '', to, href, children, ...rest }) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (to || href) {
    return (
      <SmartLink to={to} href={href} className={cls} {...rest}>
        {children}
      </SmartLink>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
