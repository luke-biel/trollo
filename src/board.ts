import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';

import { center, center_multiline } from './utils';
        
export class Board {
    title:           string;
    board_resources: Array<TrelloResource>;
    
    private readonly widthLimit = process.stdout.columns / 2;

    constructor() {
        this.title = "Your board"
        this.board_resources = []
    }

    draw() {
        clear();

        this.drawTitle()

        console.log('-'.repeat(this.widthLimit) + '\n')

        this.drawBoards()
    }

    private drawTitle() {
        console.log(chalk.white(figlet.textSync(this.title, { horizontalLayout: 'full' })))
    }

    private drawBoards() {
        if (this.board_resources.length == 0) {
            console.log(center("You have no boards!\n", this.widthLimit));
            
            return
        }
    }
}
