import { Injectable, NotFoundException } from "@nestjs/common";
import { Movie } from "./entities/movie.entity";

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getMovie(id: string): Movie {
    const movie = this.movies.find((movie) => movie.id.toString() === id);

    if (!movie) {
      throw new NotFoundException(`Movie width id: ${id} not found`);
    }

    return movie;
  }

  createMovie(movieData) {
    this.movies.push({
      ...movieData,
      id: Date.now(),
    });
  }

  deleteMovie(id: string) {
    const movie = this.getMovie(id);

    this.movies = this.movies.filter((m) => m.id !== movie.id);
  }

  updateMovie(id: string, updateData) {
    const movie = this.getMovie(id);

    this.movies = this.movies.map((m) => (m.id === movie.id ? { ...updateData, id: movie.id } : m));
  }
}
