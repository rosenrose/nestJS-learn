import { Test, TestingModule } from "@nestjs/testing";
import { NotFoundException } from "@nestjs/common";
import { MoviesService } from "./movies.service";

describe("MoviesService", () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
    it("should return an array", () => {
      expect(service.getAll()).toBeInstanceOf(Array);
    });
  });

  describe("getMovie", () => {
    it("should return a movie", () => {
      const { id } = service.createMovie({ title: "test", year: 2022, genres: ["t1", "t2"] });
      const movie = service.getMovie(id);

      expect(movie).toBeDefined();
      expect(movie.id).toEqual(id);
      expect(movie.title).toEqual("test");
      expect(movie.year).toEqual(2022);
      expect(movie.genres).toEqual(["t1", "t2"]);
    });

    it("should throw a NotFoundException", () => {
      try {
        service.getMovie(0);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie width id: ${0} not found`);
      }
    });
  });

  describe("createMovie", () => {
    it("shoud create a movie", () => {
      const movie = service.createMovie({ title: "test", year: 2022, genres: ["t1", "t2"] });

      expect(movie).toBeDefined();
      expect(movie.id).toBeLessThanOrEqual(Date.now());
      expect(movie.title).toEqual("test");
      expect(movie.year).toEqual(2022);
      expect(movie.genres).toEqual(["t1", "t2"]);
    });
  });

  describe("deleteMovie", () => {
    it("should delete a movie", () => {
      const { id } = service.createMovie({ title: "", year: 0, genres: [] });

      const beforeDelete = service.getAll();
      const deletedMovie = service.deleteMovie(id);
      const afterDelete = service.getAll();

      expect(afterDelete.length).toEqual(beforeDelete.length - 1);

      try {
        service.getMovie(deletedMovie.id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });

    it("should throw a NotFoundException", () => {
      try {
        service.deleteMovie(0);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("updateMovie", () => {
    it("should update a movie", () => {
      const { id } = service.createMovie({ title: "test", year: 2022, genres: ["t1", "t2"] });

      service.updateMovie(id, {
        title: "change",
        year: 2023,
        genres: ["g1"],
      });
      const afterUpdate = service.getMovie(id);

      expect(afterUpdate).toBeDefined();
      expect(afterUpdate.id).toEqual(id);
      expect(afterUpdate.title).toEqual("change");
      expect(afterUpdate.year).toEqual(2023);
      expect(afterUpdate.genres).toEqual(["g1"]);
    });

    it("should throw a NotFoundException", () => {
      try {
        service.updateMovie(0, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
