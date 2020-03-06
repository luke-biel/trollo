import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';

import { center } from './utils';
import { BoardResource } from './resources/board_resource';
import { Config } from './dto/config';
import { BoardFetcher } from './fetchers/board_fetcher';

export class Board {
    title: string;
    board_resources: Array<BoardResource>;
    config: Config;

    private readonly widthLimit = process.stdout.columns / 2;

    constructor(config: Config) {
        this.title = "Your board"
        this.board_resources = []
        this.config = config

        this.retrieve_boards()
    }

    draw() {
        clear();

        this.drawTitle()

        console.log('-'.repeat(this.widthLimit) + '\n')

        this.drawBoards()
    }

    private retrieve_boards() {
        // TODO: curl "https://api.trello.com/1/members/me/boards?key=$TRELLO_KEY&token=$TRELLO_TOKEN"
        let fetcher = new BoardFetcher(this.config);

        fetcher.fetch().then((response) => {
            this.board_resources = response.data.map((dto, _idx, _arr) => new BoardResource(dto.name, dto.id));
            this.draw();
        })
    }

    private drawTitle() {
        console.log(chalk.white(figlet.textSync(this.title, { horizontalLayout: 'full' })))
    }

    private drawBoards() {
        if (this.board_resources.length == 0) {
            console.log(center("You have no boards!\n", this.widthLimit));

            return
        }

        this.board_resources.forEach(board_resource => {
            console.log(board_resource.name)
        });
    }
}
