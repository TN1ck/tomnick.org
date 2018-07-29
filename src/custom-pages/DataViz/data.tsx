let m_w = 123456789;
let m_z = 987654321;
let mask = 0xffffffff;

// Returns number between 0 (inclusive) and 1.0 (exclusive),
// just like Math.random().
function random() {
    m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
    let result = ((m_z << 16) + m_w) & mask;
    result /= 4294967296;
    return result + 0.5;
}

export interface Movie {
  imdb: number;
  rotten: number;
  title: string;
  description: string;
}

export function createMockData(numberOfPoints: number = 50): Movie[] {
  return Array(numberOfPoints).fill(1).map((_, i: number) => {
    const imdb = random() * 10;
    return {
      imdb,
      rotten: Math.random() * 5,
      title: 'Something ' + i,
      description: 'Something something ' + i,
    };
  });
}

export const DATA = [

  {
    data: createMockData(100),
    name: '#100',
  },
  {
    data: createMockData(100),
    name: '#100 B',
  },
  {
    data: createMockData(500),
    name: '#500',
  },
  {
    data: createMockData(500),
    name: '#500 B',
  },
  {
    data: createMockData(1000),
    name: '#1000',
  },
  {
    data: createMockData(1000),
    name: '#1000 B',
  },
  {
    data: createMockData(2000),
    name: '#2000',
  },
  {
    data: createMockData(2000),
    name: '#2000 B',
  }
];








