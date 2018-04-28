export interface Post {
  body: string;
  id: number;
  attributes: {
    title: string;
    date: string;
    categories: string[];
    author: string;
    excerpt: string;
  }
}
