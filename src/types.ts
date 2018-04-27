export interface Post {
  body: string;
  id: number;
  attributes: {
    title: string;
    date: Date;
    categories: string[];
    author: string;
    excerpt: string;
  }
}
