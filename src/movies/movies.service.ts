import { Injectable, NotFoundException } from "@nestjs/common";
import { Movie } from "./entities/movie.entity";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";

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
      id: Date.now(),
      ...movieData,
    });
  }

  deleteMovie(id: number) {
    const movie = this.getMovie(id);

    this.movies = this.movies.filter((m) => m.id !== movie.id);
  }

  updateMovie(id: number, updateData: UpdateMovieDto) {
    const movie = this.getMovie(id);

    this.movies = this.movies.map((m) => (m.id === movie.id ? { ...movie, ...updateData } : m));
  }
}
