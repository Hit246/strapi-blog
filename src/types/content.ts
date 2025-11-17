export type ImageAttributes = {
    url: string;
    alternativeText?: string | null;
};

export type Media = {
    id: number;
    attributes: ImageAttributes;
};

export type Category = {
    id: number;
    name: string;
    slug: string;
    description?: string | null;
};

export type Tag = {
    id: number;
    label: string;
    slug: string;
};

export type BlogPost = {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured: boolean;
    readTime?: number | null;
    publishedAt: string;
    category?: Category | null;
    tags: Tag[];
    coverImage?: Media | null;
};

