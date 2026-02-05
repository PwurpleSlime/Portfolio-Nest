import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class AppService {
  async getHTMLOpenPage(): Promise<string> {
    const filePath = join(
      process.cwd(),
      'design-html-pages',
      'loadingScreen.html'
    )
    const html = await readFile(filePath, 'utf-8')
    return html
  }
  getHello(): string {
    return 'Hello World!';
  }
}
