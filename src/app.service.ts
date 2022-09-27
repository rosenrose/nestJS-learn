import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  home(): string {
    return "<h1>Home</h1>";
  }
}
