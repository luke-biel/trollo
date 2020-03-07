import { Config } from '../dto/config';
import { CardsFetcher } from '../fetchers/cards_fetcher';
import { CardDTO } from '../dto/card_dto';
import { BoardResource } from './board_resource';

/**
 * Represents list model and controller
 */
export class ListResource {
    config: Config;
    id: string;
    name: string;
    parent: BoardResource;

    cards: Array<CardDTO>;

    constructor(config: Config, id: string, name: string, parent: BoardResource) {
        this.config = config;
        this.id = id;
        this.name = name;
        this.parent = parent;
        this.cards = [];
    }

    async fill() {
        let fetcher = new CardsFetcher(this.config);

        await fetcher
            .fetch(this.id)
            .then((response) => {
                this.cards = response.data;
            });
    }
}
