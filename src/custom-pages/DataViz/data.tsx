export interface Movie {
  imdb: number;
  rotten: number;
  title: string;
  description: string;
}

export function createMockData(): Movie[] {
  return Array(Math.ceil(Math.random() * 200)).fill(1).map((_, i: number) => {
    return {
      imdb: Math.random() * 10,
      rotten: Math.random() * 5,
      title: 'Something ' + i,
      description: 'Something something ' + i,
    };
  });
}
