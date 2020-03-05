"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function center(text, limit) {
    if (limit === void 0) { limit = null; }
    var spaces = (limit !== null && limit !== void 0 ? limit : process.stdout.columns) / 2 - text.length / 2;
    return ' '.repeat(spaces) + text;
}
exports.center = center;
function center_multiline(text) {
    return text.split('\n').map(function (value, index, array) { return center(value); }).join('\n');
}
exports.center_multiline = center_multiline;
