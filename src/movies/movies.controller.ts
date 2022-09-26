import { Controller, Get, Param, Post, Delete, Patch } from "@nestjs/common";

@Controller("movies")
export class MoviesController {
  @Get()
  getAll() {
    return `<h1>All movies</h1>
      <script>
        function request(path, method = "GET", data) {
          fetch(path, {
            method: method.toUpperCase(),
            body: data
          }).then(r => r.text()).then(console.log);
        }
      </script>
    `;
  }

  @Get("/:id")
  getMovie(@Param("id") movieId: string) {
    return `movie ${movieId}`;
  }

  @Post()
  createMovie() {
    return "Create movie";
  }

  @Delete("/:id")
  deleteMovie(@Param("id") movieId: string) {
    return `Delete movie ${movieId}`;
  }

  @Patch("/:id")
  patchMovide(@Param("id") movieId: string) {
    return `Patch movie ${movieId}`;
  }
}
