import { Test, TestingModule } from "@nestjs/testing";
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

  it("should be 2", () => {
    expect(1 + 1).toEqual(2);
    expect(1 + 1).not.toEqual(3);
  });
});
