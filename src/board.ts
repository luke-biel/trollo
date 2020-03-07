import chalk from 'chalk';
import figlet from 'figlet';
import { table } from 'table';

import { center, formatTable } from './utils';
import { BoardResource } from './resources/board_resource';
import { Config } from './dto/config';
import { BoardListFetcher } from './fetchers/board_list_fetcher';

/**
 * TODO: write me
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
    }

    async init() {
        console.log('fetching boards data...');

        await this.retrieveBoards();

        this.draw();
    }

    private draw() {
        this.drawTitle();

        this.drawBoards();
    }

    private async retrieveBoards() {
        let fetcher = new BoardListFetcher(this.config);

        await fetcher
            .fetch()
            .then((response) => {
                this.boardResources = response.data.map((dto, _idx, _arr) => new BoardResource(this.config, dto.name, dto.id));
            });

        for (const res of this.boardResources) {
            await res.fill();
        }
    }

    private drawTitle() {
        console.log(chalk.white(figlet.textSync(this.title, { horizontalLayout: 'full' })));
    }

    private drawBoards() {
        if (this.boardResources.length == 0) {
            console.log(center('You have no boards!\n', this.widthLimit));

            return;
        }

        let waiting = this.boardResources
            .filter((res) => res.hasToDo())
            .map((res) => {
                return res.toDo();
            });

        let working = this.boardResources
            .filter((res) => res.hasInProgress())
            .map((res) => {
                return res.inProgress();
            });

        console.log(
            table(
                formatTable(working, '#In Progress')
            )
        );

        console.log(
            table(
                formatTable(waiting, '#To Do')
            )
        );
    }
}
