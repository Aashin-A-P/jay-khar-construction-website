export function FormStatus({ message, error }: { message?: string; error?: string }) {
  if (!message && !error) return null;

  return <p className={`rounded px-4 py-3 text-sm font-semibold ${error ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>{error || message}</p>;
}
