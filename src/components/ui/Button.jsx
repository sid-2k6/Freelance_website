import { Link } from 'react-router-dom';
import { cx } from '../../utils/helpers';
import { Spinner } from './Loader';

const VARIANTS = {
  primary: 'btn-primary',
  accent: 'btn-accent',
  ghost: 'btn-ghost',
};

/**
 * Polymorphic button: renders an internal <Link>, external <a> or <button>
 * based on the props provided.
 */
export default function Button({
  children,
  variant = 'primary',
  to,
  href,
  loading = false,
  className,
  icon: Icon,
  iconRight = false,
  ...rest
}) {
  const classes = cx(VARIANTS[variant] || VARIANTS.primary, className);
  const content = (
    <>
      {loading && <Spinner />}
      {!loading && Icon && !iconRight && <Icon className="h-4 w-4" />}
      {children}
      {!loading && Icon && iconRight && <Icon className="h-4 w-4" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button className={classes} disabled={loading || rest.disabled} {...rest}>
      {content}
    </button>
  );
}
