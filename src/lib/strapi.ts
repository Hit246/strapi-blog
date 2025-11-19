import qs from 'qs';
import type { BlogPost, Category, Tag, Media } from '@/types/content';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export const getStrapiURL = (path = '') => `${STRAPI_URL}${path}`;

type MaybeAttributes<T> = {
    id: number;
    attributes?: T;
} & Partial<T>;

type StrapiResponse<T> = {
    data: MaybeAttributes<T>[];
};

type MediaAttributes = {
    url: string;
    alternativeText?: string | null;
};

type CategoryAttributes = {
    name: string;
    slug: string;
    description?: string | null;
};

type TagAttributes = {
    label: string;
    slug: string;
};

type BlogPostAttributes = {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured: boolean;
    readTime?: number | null;
    publishedAt: string;
    coverImage?: { data: MaybeAttributes<MediaAttributes> | null };
    category?: { data: MaybeAttributes<CategoryAttributes> | null };
    tags?: {
        data: MaybeAttributes<TagAttributes>[];
    };
};

const fetcher = async <T>(path: string, options?: RequestInit): Promise<T> => {
    const url = `${getStrapiURL(`/api${path}`)}`;
    console.log('[strapi fetch PROD]', url);
    const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        next: { revalidate: 30 },
        ...options,
    });

    if (!response.ok) {
        console.error('[strapi ERROR]', response.status, response.statusText, url);
        throw new Error(`Strapi request failed: ${response.statusText}`);
    }

    const json = await response.json();
    console.log('[strapi response PROD]', url, 'data count:', json.data?.length);
    return json;
};

const unwrap = <T>(entity?: MaybeAttributes<T> | null): (T & { id: number }) | null => {
    if (!entity) return null;
    if (entity.attributes) {
        return { id: entity.id, ...entity.attributes };
    }
    return entity as T & { id: number };
};

const normalizeCategory = (entity?: MaybeAttributes<CategoryAttributes> | null): Category | null => {
    const value = unwrap<CategoryAttributes>(entity);

    if (!value) {
        return null;
    }

    return {
        id: value.id,
        name: value.name,
        slug: value.slug,
        description: value.description,
    };
};

const normalizeTags = (entities?: MaybeAttributes<TagAttributes>[]): Tag[] => {
    if (!entities) {
        return [];
    }

    return (
        entities
            .map((tag) => {
                const value = unwrap<TagAttributes>(tag);
                if (!value) {
                    return null;
                }
                return {
                    id: value.id,
                    label: value.label,
                    slug: value.slug,
                };
            })
            .filter(Boolean) as Tag[]
    );
};

const normalizeMedia = (entity?: MaybeAttributes<MediaAttributes> | null): Media | null => {
    const value = unwrap<MediaAttributes>(entity);
    if (!value) {
        return null;
    }

    const url = value.url.startsWith('http') ? value.url : getStrapiURL(value.url);

    return {
        id: value.id,
        attributes: {
            url,
            alternativeText: value.alternativeText,
        },
    };
};

const normalizePost = (entity: MaybeAttributes<BlogPostAttributes>): BlogPost => {
    const value = unwrap<BlogPostAttributes>(entity);

    if (!value) {
        throw new Error('Invalid Strapi post payload');
    }

    return {
        id: value.id,
        title: value.title,
        slug: value.slug,
        excerpt: value.excerpt,
        content: value.content,
        featured: value.featured,
        readTime: value.readTime,
        publishedAt: value.publishedAt,
        category: normalizeCategory(value.category?.data ?? null),
        tags: normalizeTags(value.tags?.data ?? []),
        coverImage: normalizeMedia(value.coverImage?.data ?? null),
    };
};

export const getPosts = async ({
    categorySlug,
    tagSlug,
}: { categorySlug?: string; tagSlug?: string } = {}) => {
    const query = qs.stringify(
        {
            populate: {
                coverImage: {
                    fields: ['url', 'alternativeText'],
                },
                category: {
                    fields: ['name', 'slug', 'description'],
                },
                tags: {
                    fields: ['label', 'slug'],
                },
            },
            sort: ['featured:desc', 'publishedAt:desc'],
            filters: {
                ...(categorySlug
                    ? {
                        category: {
                            slug: {
                                $eq: categorySlug,
                            },
                        },
                    }
                    : {}),
                ...(tagSlug
                    ? {
                        tags: {
                            slug: {
                                $eq: tagSlug,
                            },
                        },
                    }
                    : {}),
            },
        },
        { encodeValuesOnly: true },
    );

    const response = await fetcher<StrapiResponse<BlogPostAttributes>>(`/blog-posts?${query}`);
    return response.data.map(normalizePost);
};

export const getPostBySlug = async (slug: string) => {
    const query = qs.stringify(
        {
            populate: {
                coverImage: {
                    fields: ['url', 'alternativeText'],
                },
                category: {
                    fields: ['name', 'slug', 'description'],
                },
                tags: {
                    fields: ['label', 'slug'],
                },
            },
            filters: {
                slug: {
                    $eq: slug,
                },
            },
        },
        { encodeValuesOnly: true },
    );

    const response = await fetcher<StrapiResponse<BlogPostAttributes>>(`/blog-posts?${query}`);
    return response.data.length ? normalizePost(response.data[0]) : null;
};

export const getCategories = async () => {
    const query = qs.stringify(
        {
            sort: ['name:asc'],
            fields: ['name', 'slug', 'description'],
        },
        { encodeValuesOnly: true },
    );

    const response = await fetcher<StrapiResponse<CategoryAttributes>>(
        `/categories?${query}`,
    );

    return response.data
        .map((entity) => unwrap<CategoryAttributes>(entity))
        .filter(Boolean) as Category[];
};

export const getTags = async () => {
    const query = qs.stringify(
        {
            sort: ['label:asc'],
            fields: ['label', 'slug'],
        },
        { encodeValuesOnly: true },
    );

    const response = await fetcher<StrapiResponse<TagAttributes>>(`/tags?${query}`);

    return response.data
        .map((entity) => unwrap<TagAttributes>(entity))
        .filter(Boolean) as Tag[];
};

