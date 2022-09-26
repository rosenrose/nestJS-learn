import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello(): string {
    return "<h1>Hello Nest!</h1>";
  }

  getFoo(): string {
    return `<h2>Foo</h2>
      <script>console.log(1);</script>
    `;
  }
}
