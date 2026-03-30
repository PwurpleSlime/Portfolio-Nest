import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ROUTE_VERSION_MAP, DEFAULT_VERSION } from './route-version.map';

@Injectable()
export class RedirectMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(req.baseUrl);
    const path = req.baseUrl
    if (path.startsWith('/v')) {
        console.log('Starts with V, Next Called');
        return next()
    }

    if (path === '/' || path === '' ) {
        console.log('No Base URL, Redirect to /v2');
        return res.redirect(307, `/v2`)
    }
    const entry = ROUTE_VERSION_MAP.find(r => 
        path === r.prefix || path.startsWith(`${r.prefix}`)
    )
    const version = entry?.version ?? DEFAULT_VERSION
    res.redirect(307, `/${version}${path}`)
  }
}


