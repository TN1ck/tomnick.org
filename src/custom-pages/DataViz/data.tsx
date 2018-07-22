export interface Movie {
  imdb: number;
  rotten: number;
  title: string;
  description: string;
}

export function createMockData(numberOfPoints: number = 50): Movie[] {
  return Array(numberOfPoints + Math.ceil(Math.random() * numberOfPoints / 10)).fill(1).map((_, i: number) => {
    const imdb = Math.round(Math.random() * 100) / 10;
    return {
      imdb,
      rotten: Math.round((imdb / 2 + ((imdb / 4) * (Math.random() - 0.5))) * 10) / 10,
      title: 'Something ' + i,
      description: 'Something something ' + i,
    };
  });
}
