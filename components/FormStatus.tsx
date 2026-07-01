export function FormStatus({ message, error }: { message?: string; error?: string }) {
  if (!message && !error) return null;

  return <p className={`rounded px-4 py-3 text-sm font-semibold ${error ? 'bg-red-950/60 text-red-200' : 'bg-emerald-950/60 text-emerald-200'}`}>{error || message}</p>;
}
