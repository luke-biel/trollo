import { BoardFetcher } from '../fetchers/board_fetcher';
import { Config } from '../dto/config';
import { ListResource } from './list_resource';

/**
 * Represents board model and controller
 */
export class BoardResource {
    config: Config;
    name: string;
    id: string;

    private toDoRes: ListResource | null = null;
    private inProgressRes: ListResource | null = null;

    private isFilled: boolean = false;

    constructor(config: Config, name: string, id: string) {
        this.config = config;
        this.name = name;
        this.id = id;
    }

    todo() {
        if (!this.isFilled) {
            this.fill();
        }

        // TODO
    }

    inProgress() {
        if (!this.isFilled) {
            this.fill();
        }

        // TODO
    }

    async fill() {
        const fetcher = new BoardFetcher(this.config);

        await fetcher
            .fetch(this.id)
            .then(async (response) => {
                response.data.map((dto, _idx, _arr) => {
                    switch (dto.name) {
                    case 'To Do':
                        this.toDoRes = new ListResource(this.config, dto.id, dto.name);
                        break;

                    case 'In Progress':
                        this.inProgressRes = new ListResource(this.config, dto.id, dto.name);
                        break;

                    default:
                        break;
                    }
                });

                if (this.toDoRes != null && this.inProgressRes != null) {
                    this.isFilled = true;

                    await this.toDoRes.fill();
                    await this.inProgressRes.fill();
                }
            });
    }
}
