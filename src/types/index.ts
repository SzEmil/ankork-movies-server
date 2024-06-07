export type Movie = {
  plot: string;
  title: string;
  score: number;
};

export enum ReqParams {
  html = 'html',
  json = 'json',
}

export enum Database {
  sampleMflix = 'sample_mflix',
}

export enum DbCollection {
  embededMovies = 'embedded_movies',
}
