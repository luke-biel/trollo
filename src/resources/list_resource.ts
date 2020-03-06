import { Config } from '../dto/config';
import { CardsFetcher } from '../fetchers/cards_fetcher';
import { CardDTO } from '../dto/card_dto';

/**
 * Represents list model and controller
 */
export class ListResource {
    config: Config;
    id: string;
    name: string;

    private cards: Array<CardDTO>;

    constructor(config: Config, id: string, name: string) {
        this.config = config;
        this.id = id;
        this.name = name;
        this.cards = [];
    }

    async fill() {
        let fetcher = new CardsFetcher(this.config);

        fetcher
            .fetch(this.id)
            .then((response) => {
                this.cards = response.data;
            });
    }
}
