import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { Movie } from "../src/movies/entities/movie.entity";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      })
    );

    await app.init();
  });

  it("/ (GET)", () => {
    return request(app.getHttpServer()).get("/").expect(200).expect("<h1>Home</h1>");
  });

  let id = 0;

  describe("/movies", () => {
    it("GET", () => {
      return request(app.getHttpServer()).get("/movies").expect(200).expect({});
    });

    it("POST", () => {
      return request(app.getHttpServer())
        .post("/movies")
        .send({ title: "test", year: 2022, genres: ["g1", "g2"] })
        .expect(201)
        .then((response) => {
          id = (response.body as Movie).id;
        });
    });

    it("DELETE", () => {
      return request(app.getHttpServer()).delete("/movies").expect(404);
    });
  });

  describe("/movies/:id", () => {
    it("GET 200", () => {
      return request(app.getHttpServer()).get(`/movies/${id}`).expect(200);
    });

    it("GET 404", () => {
      return request(app.getHttpServer()).get(`/movies/0`).expect(404);
    });

    it.todo("DELETE");
    it.todo("PATCH");
  });
});
