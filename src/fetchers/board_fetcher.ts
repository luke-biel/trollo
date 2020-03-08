import { Config } from "../dto/config";
import axios, { AxiosResponse } from "axios";
import { boardURL } from "../url";
import { ListDTO } from "../dto/list_dto";

/**
 * Responsible for fetching data present on **TRELLO** board
 */
export class BoardFetcher {
    config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    fetch(id: string): Promise<AxiosResponse<Array<ListDTO>>> {
        return axios.get(
            `${boardURL(id)}/lists?key=${this.config.apiKey}&token=${
                this.config.apiToken
            }&fields=name,id`
        );
    }
}
