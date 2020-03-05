"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var clear_1 = __importDefault(require("clear"));
var figlet_1 = __importDefault(require("figlet"));
var utils_1 = require("./utils");
var Board = /** @class */ (function () {
    function Board() {
        this.widthLimit = process.stdout.columns / 2;
        this.title = "Your board";
        this.board_resources = [];
    }
    Board.prototype.draw = function () {
        clear_1.default();
        this.drawTitle();
        console.log('-'.repeat(this.widthLimit) + '\n');
        this.drawBoards();
    };
    Board.prototype.drawTitle = function () {
        console.log(chalk_1.default.white(figlet_1.default.textSync(this.title, { horizontalLayout: 'full' })));
    };
    Board.prototype.drawBoards = function () {
        if (this.board_resources.length == 0) {
            console.log(utils_1.center("You have no boards!\n", this.widthLimit));
            return;
        }
    };
    return Board;
}());
exports.Board = Board;
