import axios, { AxiosResponse } from 'axios';

import { Config } from "../dto/config";
import { BoardDTO } from '../dto/board_dto';
import { BOARDS_URL } from '../const';

export class BoardFetcher {
    config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    async fetch(): Promise<AxiosResponse<Array<BoardDTO>>> {
        return axios.get(`${BOARDS_URL}?key=${this.config.api_key}&token=${this.config.api_token}`)
    }
}
