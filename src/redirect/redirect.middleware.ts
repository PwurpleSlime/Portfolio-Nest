import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ROUTE_VERSION_MAP, DEFAULT_VERSION } from './route-version.map';

@Injectable()
export class RedirectMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const path = req.baseUrl
    if (process.env.LOGGER_ENABLED) console.log(path);
    // Already Versioned
    if (path.startsWith('/v')) {
        if (process.env.LOGGER_ENABLED) console.log('Starts with V, Next Called');
        return next()
    }

    const match = ROUTE_VERSION_MAP
    .map(entry => ({
      entry,
      matchedPrefix: entry.prefix.find(prefix => {
        if (prefix === '' || prefix === '/') {
          return path === '' || path === '/';
        }

        return path === prefix || path.startsWith(`${prefix}/`)
      }),
    }))
    .find(result => result.matchedPrefix !== undefined);

    if (!match) return res.redirect(307, `/${DEFAULT_VERSION}${path}`)

    const { entry, matchedPrefix } = match
    const prefix = matchedPrefix!
    
    if (entry.redirect === false) return next()

    const version = entry.version ?? DEFAULT_VERSION
    
    const remainingPath = 
      prefix === '' || prefix === '/'
      ? path
      : path.substring(prefix.length)
    
    const destination = `/${version}${entry.destinationPrefix}${remainingPath}`
    return res.redirect(307, destination)
  }
}


