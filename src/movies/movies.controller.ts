import { Controller, Get, Param, Post, Delete, Patch, Body, Query } from "@nestjs/common";

@Controller("movies")
export class MoviesController {
  @Get()
  getAll() {
    return `<h1>All movies</h1>
      <script>
        function request(path, method = "GET", data) {
          fetch(path, {
            method: method.toUpperCase(),
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          })
            .then(r => r.text())
            .then(text => {
              try {
                console.log(JSON.parse(text));
              } catch {
                console.log(text);
              }
            });
        }
      </script>
    `;
  }

  @Get("/search") //search가 :id보다 먼저 와야 함
  searchMovie(@Query("year") year: string) {
    return `Search movie year: ${year}`;
  }

  @Get("/:id")
  getMovie(@Param("id") movieId: string) {
    return `movie ${movieId}`;
  }

  @Post()
  createMovie(@Body() movieData) {
    return `Create movie ${JSON.stringify(movieData)}`;
  }

  @Delete("/:id")
  deleteMovie(@Param("id") movieId: string) {
    return { deletedMovie: movieId };
  }

  @Patch("/:id")
  patchMovide(@Param("id") movieId: string, @Body() updateData) {
    return { updatedMovie: movieId, ...updateData };
  }
}
