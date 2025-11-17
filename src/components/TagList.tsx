import Link from 'next/link';
import type { Tag } from '@/types/content';

type Props = {
    tags: Tag[];
    variant?: 'link' | 'static';
};

const TagList = ({ tags, variant = 'static' }: Props) => {
    if (!tags.length) return null;

    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag) => {
                const pill = (
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-xs uppercase tracking-wide text-slate-200">
                        #{tag.label}
                    </span>
                );

                if (variant === 'link') {
                    return (
                        <Link
                            key={tag.id}
                            href={`/?tag=${tag.slug}`}
                            className="transition hover:-translate-y-0.5"
                        >
                            {pill}
                        </Link>
                    );
                }

                return (
                    <span key={tag.id} className="transition">
                        {pill}
                    </span>
                );
            })}
        </div>
    );
};

export default TagList;

