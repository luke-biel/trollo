export const TRELLO_URL_BASE: string = 'https://api.trello.com/1';
export const MY_BOARDS_URL: string = `${TRELLO_URL_BASE}/members/me/boards`;
export const BOARDS_URL_BASE: string = `${TRELLO_URL_BASE}/boards`;
export const LISTS_URL_BASE: string = `${TRELLO_URL_BASE}/lists`;

/**
 * Get board uri string
 * @param id id of a board in question
 */
export function boardURL(id: string): string {
    return `${BOARDS_URL_BASE}/${id}`;
}

/**
 * Get list uri string
 * @param id id of list in question
 */
export function listUrl(id: string): string {
    return `${LISTS_URL_BASE}/${id}`;
}
