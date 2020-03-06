import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';

import { center } from './utils';
import { BoardResource } from './resources/board_resource';
import { Config } from './dto/config';
import { BoardListFetcher } from './fetchers/board_list_fetcher';

/**
 * 
 */
export class Board {
    title: string;
    boardResources: Array<BoardResource>;
    config: Config;

    private readonly widthLimit = process.stdout.columns / 2;

    constructor(config: Config) {
        this.title = 'Your board';
        this.boardResources = [];
        this.config = config;

        this.retrieveBoards();
    }

    draw() {
        clear();

        this.drawTitle();

        console.log('-'.repeat(this.widthLimit) + '\n');

        this.drawBoards();
    }

    private retrieveBoards() {
        let fetcher = new BoardListFetcher(this.config);

        fetcher
            .fetch()
            .then((response) => {
                this.boardResources = response.data.map((dto, _idx, _arr) => new BoardResource(this.config, dto.name, dto.id));
                this.draw();
            })
            .then(() => {
                this.boardResources.forEach((res, _idx, _arr) => res.fill());
                this.draw();
            });
    }

    private drawTitle() {
        console.log(chalk.white(figlet.textSync(this.title, { horizontalLayout: 'full' })));
    }

    private drawBoards() {
        if (this.boardResources.length == 0) {
            console.log(center('You have no boards!\n', this.widthLimit));

            return;
        }

        this.boardResources.forEach(boardResource => {
            console.log(boardResource.name);
        });
    }
}
