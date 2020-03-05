declare class TrelloResource {
    board_name: string;
    constructor(board_name: string);
    todo(): void;
    in_progress(): void;
}
