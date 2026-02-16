export const DEFAULT_VERSION = 'v1';

export const ROUTE_VERSION_MAP: Array<{
  prefix: string;
  version: string;
}> = [
  { prefix: '/helloWorld', version: 'v2' },
  { prefix: '/speakeasy-auth/register', version: 'v1'}
];
