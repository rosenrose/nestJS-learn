import { Controller, Get, Req, Res } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  home(@Req() req, @Res() res) {
    console.log(req);
    res.send("<h1>hello</h1>");
    // 추천하지 않는 방법. NestJS는 Express와 Fastify와 호환 가능
  }
}
