import { Suspense } from 'react';
import CategoryFilter from '@/components/CategoryFilter';
import EmptyState from '@/components/EmptyState';
import PostCard from '@/components/PostCard';
import { getCategories, getPosts, getTags } from '@/lib/strapi';

type SearchParams = Record<string, string | string[] | undefined>;

type Props = {
  searchParams?: SearchParams | Promise<SearchParams>;
};

const Home = async ({ searchParams }: Props) => {
  const resolvedParams = (await searchParams) ?? {};
  const categorySlug = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;
  const tagSlug = typeof resolvedParams.tag === 'string' ? resolvedParams.tag : undefined;

  const [posts, categories, tags] = await Promise.all([
    getPosts({ categorySlug, tagSlug }).catch((err) => {
      console.error('[getPosts ERROR]', err);
      return [];
    }),
    getCategories().catch((err) => {
      console.error('[getCategories ERROR]', err);
      return [];
    }),
    getTags().catch((err) => {
      console.error('[getTags ERROR]', err);
      return [];
    }),
  ]);

  console.log('[page.tsx] posts count:', posts.length);

  const featuredPost = posts.find((post) => post.featured) ?? posts[0];
  const remainingPosts = featuredPost ? posts.filter((post) => post.id !== featuredPost.id) : posts;

  return (
    <div className="space-y-12">
      <Suspense
        fallback={
          <div className="rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-slate-300">
            Loading filters…
          </div>
        }
      >
        <CategoryFilter categories={categories} tags={tags} />
      </Suspense>

      {posts.length === 0 ? (
        <EmptyState
          title="No posts match the filters"
          description="Try clearing the filters or add fresh content in Strapi."
        />
      ) : (
        <div className="space-y-10">
          {featuredPost && <PostCard post={featuredPost} highlight />}

          {remainingPosts.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2">
              {remainingPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
