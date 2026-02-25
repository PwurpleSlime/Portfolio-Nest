import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { getHTMLPage } from 'src/utility/getHTMLpage';

@Injectable()
export class ChaosCodingChallengeService {
    async loadHTMLPage(): Promise<string> {
        return await getHTMLPage('chaosGame.html')
    }
    
}

