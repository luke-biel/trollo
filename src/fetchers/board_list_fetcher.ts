import axios, { AxiosResponse } from 'axios';

import { Config } from '../dto/config';
import { BoardDTO } from '../dto/board_dto';
import { MY_BOARDS_URL } from '../url';

/**
 * Responsible for fetching info of all user boards
 */
export class BoardListFetcher {
    config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    async fetch(): Promise<AxiosResponse<Array<BoardDTO>>> {
        return axios.get(`${MY_BOARDS_URL}?key=${this.config.apiKey}&token=${this.config.apiToken}&fields=name,id`);
    }
}
