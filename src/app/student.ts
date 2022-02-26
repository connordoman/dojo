export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  rank: Rank;
  birthdate: string;
  email: string;
  phone: string;
}

export const RANKS: string[] = [
  'white belt',
  'yellow stripe',
  'orange stripe',
  'yellow belt',
  'high yellow belt',
  'orange belt',
  'high orange belt',
  'red belt',
  'high red belt',
  'green belt',
  'high green belt',
  'purple belt',
  'high purple belt',
  'blue belt',
  'high blue belt',
  'brown belt',
  'junior black belt',
  'shodan',
  'nidan',
  'sandan',
  'yondan',
  'godan',
  'rokudan',
  'nanadan',
  'hachidan',
  'kudan',
  'jyudan',
];

export type Rank = typeof RANKS[number];
