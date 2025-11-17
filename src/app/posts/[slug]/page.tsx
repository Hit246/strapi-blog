import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import TagList from '@/components/TagList';
import PostMeta from '@/components/PostMeta';
import { getPostBySlug } from '@/lib/strapi';

type PageProps = {
    params: { slug: string };
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = params;
    try {
        const post = await getPostBySlug(slug);

        if (!post) {
            return { title: 'Post not found' };
        }

        return {
            title: post.title,
            description: post.excerpt,
        };
    } catch {
        return {
            title: 'Launchpad Journal',
            description: 'Stories that fuel our build-in-public journey.',
        };
    }
}

const BlogPostPage = async ({ params }: PageProps) => {
    const { slug } = params;
    let post = null;

    try {
        post = await getPostBySlug(slug);
    } catch {
        post = null;
    }

    if (!post) {
        notFound();
    }

    return (
        <article className="space-y-8">
            <div className="space-y-6 text-center">
                <TagList tags={post.tags} variant="static" />
                <h1 className="text-4xl font-semibold text-white md:text-5xl">{post.title}</h1>
                <PostMeta post={post} />
            </div>

            {post.coverImage?.attributes.url && (
                <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/5">
                    <Image
                        src={post.coverImage.attributes.url}
                        alt={post.coverImage.attributes.alternativeText ?? post.title}
                        fill
                        sizes="100vw"
                        className="object-cover"
                        priority
                    />
                </div>
            )}

            <div className="prose prose-invert mx-auto max-w-3xl text-lg leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
        </article>
    );
};

export default BlogPostPage;

