/**
 * center text in terminal
 * @param text text to center
 * @param limit maximum length of line (if null then terminal width will be used)
 */
export function center(text: string, limit: number | null = null) {
    let spaces = (limit ?? process.stdout.columns) / 2 - text.length / 2;
    return ' '.repeat(spaces) + text;
}
