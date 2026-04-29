export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  imageUrl?: string;
  body: unknown[];
}
