import Link from 'next/link';

const NotFound = () => (
    <div className="space-y-6 text-center">
        <p className="text-sm uppercase tracking-[0.4em] text-slate-400">404</p>
        <h1 className="text-4xl font-semibold text-white">This story is still being written.</h1>
        <p className="text-slate-300">Try heading back to the newsroom to discover the latest updates.</p>
        <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-2 text-sm font-semibold text-white transition hover:bg-brand-light"
        >
            Return home
        </Link>
    </div>
);

export default NotFound;

