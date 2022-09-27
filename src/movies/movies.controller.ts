import { Controller, Get, Param, Post, Delete, Patch, Body, Query } from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { Movie } from "./entities/movie.entity";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";

@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  home() {
    return `<h1>Movies</h1>
      <script>
        function request(path, method = "GET", data) {
          fetch(path, {
            method: method.toUpperCase(),
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
            .then(r => new Promise(resolve => (
              r.text().then(text => resolve([r.status, r.statusText, text]))
            )))
            .then(([status, statusText, text]) => {
              let message = null;
              try {
                message = JSON.parse(text);
              } catch { }
              console.log(status, statusText, message || text);
            });
        }
      </script>
    `;
  }

  @Get("/all")
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get("/search")
  searchMovie(@Query("year") year: number) {
    return `Search movie year: ${year}`;
  }

  @Get("/:id")
  getMovie(@Param("id") movieId: number): Movie {
    return this.moviesService.getMovie(movieId);
  }

  @Post()
  createMovie(@Body() movieData: CreateMovieDto): Movie {
    return this.moviesService.createMovie(movieData);
  }

  @Delete("/:id")
  deleteMovie(@Param("id") movieId: number): Movie {
    return this.moviesService.deleteMovie(movieId);
  }

  @Patch("/:id")
  updateMovide(@Param("id") movieId: number, @Body() updateData: UpdateMovieDto): Movie {
    return this.moviesService.updateMovie(movieId, updateData);
  }
}
