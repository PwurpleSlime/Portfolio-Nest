import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class ChaosCodingChallengeService {
        async loadHTMLPage(): Promise<string> {
            const filePath = join(
                process.cwd(),
                'design-html-pages',
                'chaosGame.html'
            )
            const html = await readFile(filePath, 'utf-8')
    
            return html
        }
    
}

