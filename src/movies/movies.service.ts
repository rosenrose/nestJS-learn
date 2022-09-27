import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { Movie } from "./entities/movie.entity";

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getMovie(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);

    if (!movie) {
      throw new NotFoundException(`Movie width id: ${id} not found`);
    }

    return movie;
  }

  createMovie(movieData: CreateMovieDto) {
    this.movies.push({
      ...movieData,
      id: Date.now(),
    });
  }

  deleteMovie(id: number) {
    const movie = this.getMovie(id);

    this.movies = this.movies.filter((m) => m.id !== movie.id);
  }

  updateMovie(id: number, updateData) {
    const movie = this.getMovie(id);

    this.movies = this.movies.map((m) => (m.id === movie.id ? { ...updateData, id: movie.id } : m));
  }
}
