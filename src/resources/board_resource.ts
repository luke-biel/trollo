import { BoardFetcher } from "../fetchers/board_fetcher";
import { Config } from "../dto/config";
import { ListResource } from "./list_resource";

/**
 * Represents board model and controller
 */
export class BoardResource {
    config: Config;
    name: string;
    id: string;

    private toDoRes: ListResource | null = null;
    private inProgressRes: ListResource | null = null;

    constructor(config: Config, name: string, id: string) {
        this.config = config;
        this.name = name;
        this.id = id;
    }

    toDo(): ListResource {
        if (this.toDoRes == null) {
            throw "Tried to fetch 'To Do' resource which wasn't populated yet";
        }

        return this.toDoRes;
    }

    hasToDo(): boolean {
        return this.toDoRes != null;
    }

    inProgress(): ListResource {
        if (this.inProgressRes == null) {
            throw "Tried to fetch 'In Progress' resource which wasn't populated yet";
        }

        return this.inProgressRes;
    }

    hasInProgress(): boolean {
        return this.inProgressRes != null;
    }

    async fill() {
        const fetcher = new BoardFetcher(this.config);

        await fetcher.fetch(this.id).then(response => {
            response.data.map((dto, _idx, _arr) => {
                switch (dto.name) {
                    case "To Do":
                        this.toDoRes = new ListResource(
                            this.config,
                            dto.id,
                            dto.name,
                            this
                        );
                        break;

                    case "In Progress":
                        this.inProgressRes = new ListResource(
                            this.config,
                            dto.id,
                            dto.name,
                            this
                        );
                        break;

                    default:
                        break;
                }
            });
        });

        if (this.toDoRes != null && this.inProgressRes != null) {
            await this.toDoRes.fill();
            await this.inProgressRes.fill();
        }
    }
}
