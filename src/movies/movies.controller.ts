import { Controller, Get, Param, Post, Delete, Patch, Body, Query } from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { Movie } from "./entities/movie.entity";

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
              r.text().then(text => resolve([r.status, text]))
            )))
            .then(([status, text]) => {
              try {
                console.log(status, JSON.parse(text));
              } catch {
                console.log(status, text);
              }
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
  searchMovie(@Query("year") year: string) {
    return `Search movie year: ${year}`;
  }

  @Get("/:id")
  getMovie(@Param("id") movieId: string): Movie | undefined {
    return this.moviesService.getMovie(movieId);
  }

  @Post()
  createMovie(@Body() movieData) {
    return this.moviesService.createMovie(movieData);
  }

  @Delete("/:id")
  deleteMovie(@Param("id") movieId: string): boolean {
    return this.moviesService.deleteMovie(movieId);
  }

  @Patch("/:id")
  patchMovide(@Param("id") movieId: string, @Body() updateData) {
    return { updatedMovie: movieId, ...updateData };
  }
}
