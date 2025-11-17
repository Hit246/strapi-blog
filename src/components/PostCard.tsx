import Image from 'next/image';
import Link from 'next/link';
import PostMeta from '@/components/PostMeta';
import TagList from '@/components/TagList';
import type { BlogPost } from '@/types/content';

type Props = {
    post: BlogPost;
    highlight?: boolean;
};

const PostCard = ({ post, highlight = false }: Props) => {
    const coverImage = post.coverImage?.attributes.url;

    return (
        <article
            className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-6 shadow-card transition hover:border-brand ${highlight ? 'md:flex-row md:items-center md:gap-10' : ''
                }`}
        >
            {coverImage && (
                <div className={`relative mb-6 aspect-video overflow-hidden rounded-2xl ${highlight ? 'md:mb-0 md:w-1/2' : ''}`}>
                    <Image
                        src={coverImage}
                        alt={post.coverImage?.attributes.alternativeText ?? post.title}
                        fill
                        sizes={highlight ? '(min-width: 768px) 50vw, 100vw' : '100vw'}
                        className="object-cover transition duration-500 group-hover:scale-105"
                    />
                </div>
            )}

            <div className={highlight ? 'flex-1' : ''}>
                {post.featured && (
                    <p className="mb-2 text-xs uppercase tracking-[0.4em] text-brand-light">Featured</p>
                )}
                <Link href={`/posts/${post.slug}`}>
                    <h3 className={`font-semibold text-white ${highlight ? 'text-3xl' : 'text-2xl'} leading-tight`}>
                        {post.title}
                    </h3>
                </Link>
                <p className="mt-4 text-base text-slate-300">{post.excerpt}</p>

                <div className="mt-6 space-y-3">
                    <PostMeta post={post} />
                    <TagList tags={post.tags} variant="link" />
                </div>

                <Link
                    href={`/posts/${post.slug}`}
                    className="mt-8 inline-flex items-center gap-2 text-brand-light transition hover:text-white"
                >
                    Read the story
                    <span aria-hidden>→</span>
                </Link>
            </div>
        </article>
    );
};

export default PostCard;

