import { readFile } from "fs/promises"
import { join } from "path"

export async function getHTMLPage(fileName: string): Promise<string> {
    const filePath = join(
        process.cwd(),
        'design-html-pages',
        fileName
    )
    const html = await readFile(filePath, 'utf-8')

    return html

}

