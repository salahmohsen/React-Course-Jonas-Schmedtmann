import { Link } from "react-router-dom";

function Button({ children, disabled, to, type }) {
  const base =
    " text-sm inline-block rounded-full bg-yellow-400  font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed ";

  const styles = {
    primary: base + " px-3 py-2 md:px-6 md:py-4",
    small: base + " py-2 px-2 md:px-3 md:py-1.5 text-xs",
    secondary:
      "text-sm inline-block rounded-full border-2 border-stone-300  font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 focus:bg-stone-300 hover:text-stone-800 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-3 py-2 md:px-6 md:py-4",
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
