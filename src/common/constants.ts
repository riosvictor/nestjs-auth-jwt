export const JWT = {
  // CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.
  SECRET: '76F367A652BD433D6E21719E83CA6',
  OPTIONS: {
    // IN MINUTES
    EXPIRES_IN_MINUTES: 5,
  },
};
// IN MINUTES
export const CACHE_TTL_MINUTES = 10;
export const IS_PUBLIC_KEY = 'isPublic';
export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  TEST = 'test',
}
