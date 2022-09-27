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

  deleteMovie(movieId: number): Movie {
    const movie = this.getMovie(movieId);

    this.movies = this.movies.filter((m) => m.id !== movie.id);

    return movie;
  }

  updateMovie(movieId: number, updateData: UpdateMovieDto): Movie {
    const movie = this.getMovie(movieId);
    let updatedMovie: Movie;

    this.movies = this.movies.map((m) =>
      m.id === movie.id ? (updatedMovie = { ...movie, ...updateData }) : m
    );

    return updatedMovie;
  }
}
