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
    it("GET 200", () => {
      return request(app.getHttpServer()).get("/movies").expect(200).expect({});
    });

    it("POST 201", () => {
      return request(app.getHttpServer())
        .post("/movies")
        .send({ title: "test", year: 2022, genres: ["g1", "g2"] })
        .expect(201)
        .then((response) => {
          id = (response.body as Movie).id;
        });
    });

    it("POST 400", () => {
      return request(app.getHttpServer())
        .post("/movies")
        .send({ id: 1, title: "test" })
        .expect(400);
    });

    it("DELETE 404", () => {
      return request(app.getHttpServer()).delete("/movies").expect(404);
    });

    it("PATCH 404", () => {
      return request(app.getHttpServer()).patch("/movies").expect(404);
    });
  });

  describe("/movies/:id", () => {
    it("GET 200", () => {
      return request(app.getHttpServer()).get(`/movies/${id}`).expect(200);
    });

    it("GET 404", () => {
      return request(app.getHttpServer()).get(`/movies/0`).expect(404);
    });

    it("PATCH 200", () => {
      return request(app.getHttpServer())
        .patch(`/movies/${id}`)
        .send({ title: "test2", year: 2023, genres: ["t1"] })
        .expect(200);
    });

    it("PATCH 404", () => {
      return request(app.getHttpServer()).patch(`/movies/0`).send({}).expect(404);
    });

    it("DELETE 200", () => {
      return request(app.getHttpServer()).delete(`/movies/${id}`).expect(200);
    });

    it("DELETE 404", () => {
      return request(app.getHttpServer()).delete(`/movies/0`).expect(404);
    });
  });
});
