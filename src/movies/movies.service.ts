import { Injectable } from "@nestjs/common";
import { Movie } from "./entities/movie.entity";

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getMovie(id: string): Movie | undefined {
    return this.movies.find((movie) => movie.id.toString() === id);
  }

  createMovie(movieData) {
    this.movies.push({
      id: Date.now(),
      ...movieData,
    });
  }

  deleteMovie(id: string): boolean {
    const index = this.movies.findIndex((movie) => movie.id.toString() === id);

    if (index < 0) {
      return false;
    }

    this.movies.splice(index, 1);
    return true;
  }
}
