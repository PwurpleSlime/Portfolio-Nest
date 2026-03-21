import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { getHTMLPage } from '../../utility/getHTMLpage';

@Injectable()
export class ImageLoadingService {

    async loadHTMLPage(): Promise<string> {
        return await getHTMLPage('inputImageScreen.html')
    }
}
