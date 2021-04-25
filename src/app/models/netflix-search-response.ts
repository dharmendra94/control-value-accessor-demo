export interface movie {
  avgrating: number;
  id: number;
  imdbid: string;
  imdbrating: number;
  img: string;
  poster: string;
  title: string;
  titledate: string;
  vtype: string;
  year: number;
}

export interface SearchResponse {
  elapse: number;
  total: number;
  results: movie[];
}
