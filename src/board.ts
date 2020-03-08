import chalk from "chalk";
import figlet from "figlet";

import { BoardResource } from "./resources/board_resource";
import { Config } from "./dto/config";
import { BoardListFetcher } from "./fetchers/board_list_fetcher";

/**
 * TODO: write me
 */
export class Board {
    title: string;
    boardResources: Array<BoardResource>;
    config: Config;

    constructor(config: Config) {
        this.title = "Your board";
        this.boardResources = [];
        this.config = config;
    }

    async init() {
        await this.retrieveBoards();

        this.draw();
    }

    private draw() {
        this.drawBoards();
    }

    private async retrieveBoards() {
        let fetcher = new BoardListFetcher(this.config);

        await fetcher.fetch().then(response => {
            this.boardResources = response.data.map(
                (dto, _idx, _arr) =>
                    new BoardResource(this.config, dto.name, dto.id)
            );
        });

        for (const res of this.boardResources) {
            await res.fill();
        }
    }

    private drawBoards() {
        if (this.boardResources.length == 0) {
            console.log("You have no boards!\n");

            return;
        }

        let working = this.boardResources
            .filter(res => res.hasInProgress())
            .map(res => {
                return res.inProgress();
            })
            .filter(res => res.cards.length > 0);

        let waiting = this.boardResources
            .filter(res => res.hasToDo())
            .map(res => {
                return res.toDo();
            })
            .filter(res => res.cards.length > 0);

        let shuffled = waiting.sort(() => 0.5 - Math.random());

        // Drawing happens there

        console.log(figlet.textSync("Your trello"));

        console.log("In development:");
        if (working.length > 0) {
            console.log(
                working
                    .map(
                        res =>
                            chalk`{gray.italic ${
                                res.parent.name
                            }}: ${res.cards.pop()}`
                    )
                    .join("\n")
            );
        } else {
            console.log(
                chalk`\t{red.bold ...there's nothing being worked on currently}`
            );
        }

        console.log("\nSome tasks that are waiting:");
        if (waiting.length > 0) {
            console.log(
                shuffled
                    .flatMap(res =>
                        res.cards.map(
                            card => `${res.parent.name} - ${card.name}`
                        )
                    )
                    .slice(0, 5)
                    .map(s => chalk`{green *}\t{gray.italic ${s}}`)
                    .join("\n")
            );
        } else {
            console.log(chalk`{red.bold \t...there's nothing to do}`);
        }
    }
}
