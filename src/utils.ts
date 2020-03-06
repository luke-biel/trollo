export function center(text: string, limit: number | null = null) {
    let spaces = (limit ?? process.stdout.columns) / 2 - text.length / 2
    return ' '.repeat(spaces) + text
}

export function center_multiline(text: string) {
    return text.split('\n').map(function (value, _idx, _arr) { return center(value) }).join('\n')
}
