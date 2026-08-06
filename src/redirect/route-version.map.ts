export const DEFAULT_VERSION = 'v1';

export const ROUTE_VERSION_MAP: Array<{
  prefix: string[];
  destinationPrefix: string;
  version?: string;
  redirect?: boolean;
}> = [
  { prefix: ['', '/'], destinationPrefix: '', version: 'v2'},
  { prefix: ['/helloWorld'], destinationPrefix: '/helloWorld', version: 'v2' },
  { prefix: ['/speakeasy-auth/register'], destinationPrefix: '/speakeasy-auth/register', version: 'v1'},
  { prefix: ['/aboutMe'], destinationPrefix: '/aboutMe', version: 'v2'},

  // Don't redirect
  { prefix: ['/favicon.ico'], destinationPrefix: '/favicon.ico', redirect: false}
];
