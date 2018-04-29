export interface Post {
  body: string;
  id: string;
  attributes: {
    title: string;
    date: string;
    categories: string[];
    author: string;
    excerpt: string;
  }
}


export interface Project {
  body: string;
  id: string;
  attributes: {
    title: string;
    year: string;
    author: string;
    video: string;
    preview: string;
  }
}
