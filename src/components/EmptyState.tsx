import type { ReactNode } from 'react';

type Props = {
    title: string;
    description: string;
    action?: ReactNode;
};

const EmptyState = ({ title, description, action }: Props) => (
    <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-10 text-center text-slate-300">
        <p className="text-xl font-semibold text-white">{title}</p>
        <p className="mt-3">{description}</p>
        {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
);

export default EmptyState;

