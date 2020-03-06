export class BoardResource {
    name: string;
    id: string;

    private is_filled: boolean = false;

    constructor(board_name: string, board_id: string) {
        this.name = board_name
        this.id = board_id
    }

    todo() {
        if (!this.is_filled) {
            this.fill();
        }

        // TODO
    }

    in_progress() {
        if (!this.is_filled) {
            this.fill();
        }

        // TODO
    }

    fill() {
        // let fetcher = new TrelloResourceFetcher();

        // let data = fetcher.fetch();
    }
}
