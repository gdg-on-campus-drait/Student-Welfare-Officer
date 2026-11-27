import SmartLink from './SmartLink';

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ease-out focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 disabled:opacity-50';

const variants = {
  gold: 'bg-gold-500 text-navy-950 hover:bg-gold-300 shadow-[0_10px_30px_-10px_rgba(201,161,59,0.7)]',
  navy: 'bg-navy-900 text-white hover:bg-navy-700',
  outline: 'border border-navy-200 bg-white text-navy-900 hover:border-navy-900',
  glass: 'border border-white/40 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-navy-950',
  ghost: 'text-navy-900 hover:bg-navy-50',
};

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-sm sm:text-[15px]',
};

export default function Button({ variant = 'navy', size = 'md', className = '', to, href, children, ...rest }) {
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
