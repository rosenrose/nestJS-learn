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

  getMovie(movieId: number): Movie {
    const movie = this.movies.find((movie) => movie.id === movieId);

    if (!movie) {
      throw new NotFoundException(`Movie width id: ${movieId} not found`);
    }

    return movie;
  }

  createMovie(movieData: CreateMovieDto): Movie {
    const movie = { id: Date.now(), ...movieData };

    this.movies.push(movie);

    return movie;
  }

  deleteMovie(movieId: number) {
    const { id } = this.getMovie(movieId);

    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  updateMovie(movieId: number, updateData: UpdateMovieDto) {
    const movie = this.getMovie(movieId);

    this.movies = this.movies.map((m) => (m.id === movie.id ? { ...movie, ...updateData } : m));
  }
}
