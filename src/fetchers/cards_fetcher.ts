import { Config } from '../dto/config';
import axios, { AxiosResponse } from 'axios';
import { listUrl } from '../url';
import { CardDTO } from '../dto/card_dto';

/**
 * Responsible for fetching list of cards present on trello board
 */
export class CardsFetcher {
    config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    fetch(id: string): Promise<AxiosResponse<Array<CardDTO>>> {
        return axios.get(`${listUrl(id)}/cards?key=${this.config.apiKey}&token=${this.config.apiToken}&fields=name,id`);
    }
}
