export const ROLES_HIREACHY: Record<string, string[]> = {
    owner: ['owner', 'admin', 'user', 'guest'],
    admin: ['admin', 'user', 'guest'],
    user: ['user', 'guest'],
    guest: ['guest']
}