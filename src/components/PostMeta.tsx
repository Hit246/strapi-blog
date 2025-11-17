import Link from 'next/link';
import { formatDate } from '@/lib/format';
import type { BlogPost } from '@/types/content';

type Props = {
    post: BlogPost;
};

const PostMeta = ({ post }: Props) => (
    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
        <span>{formatDate(post.publishedAt)}</span>
        {post.readTime && <span>• {post.readTime} min read</span>}
        {post.category && (
            <Link href={`/?category=${post.category.slug}`} className="text-brand-light hover:text-white">
                {post.category.name}
            </Link>
        )}
    </div>
);

export default PostMeta;

