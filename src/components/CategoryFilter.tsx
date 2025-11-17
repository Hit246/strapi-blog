'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import type { Category, Tag } from '@/types/content';

type Props = {
    categories: Category[];
    tags: Tag[];
};

const buildQueryString = (search: URLSearchParams, key: string, value?: string) => {
    const params = new URLSearchParams(search.toString());

    if (!value) {
        params.delete(key);
    } else {
        params.set(key, value);
    }

    return params.toString() ? `?${params.toString()}` : '';
};

const FilterButton = ({
    label,
    isActive,
    href,
}: {
    label: string;
    isActive: boolean;
    href: string;
}) => (
    <Link
        href={href}
        className={`rounded-full border px-4 py-1 text-sm transition ${isActive
                ? 'border-brand bg-brand text-white'
                : 'border-white/10 text-slate-300 hover:border-white/40 hover:text-white'
            }`}
    >
        {label}
    </Link>
);

const CategoryFilter = ({ categories, tags }: Props) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get('category') ?? undefined;
    const activeTag = searchParams.get('tag') ?? undefined;

    const buildHref = (key: 'category' | 'tag', value?: string) =>
        `${pathname}${buildQueryString(searchParams, key, value)}`;

    return (
        <div className="space-y-6">
            <div>
                <p className="mb-3 text-xs uppercase tracking-[0.4em] text-slate-400">Categories</p>
                <div className="flex flex-wrap gap-2">
                    <FilterButton label="All" isActive={!activeCategory} href={buildHref('category')} />
                    {categories.map((category) => (
                        <FilterButton
                            key={category.id}
                            label={category.name}
                            isActive={activeCategory === category.slug}
                            href={buildHref('category', category.slug)}
                        />
                    ))}
                </div>
            </div>

            <div>
                <p className="mb-3 text-xs uppercase tracking-[0.4em] text-slate-400">Tags</p>
                <div className="flex flex-wrap gap-2">
                    <FilterButton label="All" isActive={!activeTag} href={buildHref('tag')} />
                    {tags.map((tag) => (
                        <FilterButton
                            key={tag.id}
                            label={`#${tag.label}`}
                            isActive={activeTag === tag.slug}
                            href={buildHref('tag', tag.slug)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryFilter;

