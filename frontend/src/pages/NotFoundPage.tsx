import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="section text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 font-display text-5xl font-extrabold">Page not found</h1>
      <p className="mx-auto mt-4 max-w-xl text-steel">The page you are looking for may have moved during the rebuild.</p>
      <Link className="btn-primary mt-8" to="/">Return Home</Link>
    </section>
  );
}
