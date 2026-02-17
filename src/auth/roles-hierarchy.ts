export const ROLES_HIREACHY: Record<string, string[]> = {
    admin: ['admin', 'user', 'guest'],
    user: ['user', 'guest'],
    guest: ['guest']
}