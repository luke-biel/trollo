import { ListResource } from './resources/list_resource';
import chalk from 'chalk';

/**
 * center text in terminal
 * @param text text to center
 * @param limit maximum length of line (if null then terminal width will be used)
 */
export function center(text: string, limit: number | null = null) {
    let spaces = (limit ?? process.stdout.columns) / 2 - text.length / 2;
    return ' '.repeat(spaces) + text;
}

/**
 * Formats table arranged from ListResources into key-value dictionary
 */
export function formatTable(items: Array<ListResource>, title: string): Array<any> {
    return [[chalk`{bold.gray #Board: }`, chalk`{bold.gray ${title}}`]].concat(
        items.map((res) => res.cards.map((card) => [res.parent.name, card.name])).flat()
    );
}
