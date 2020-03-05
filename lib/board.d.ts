export declare class Board {
    title: string;
    board_resources: Array<TrelloResource>;
    private readonly widthLimit;
    constructor();
    draw(): void;
    private drawTitle;
    private drawBoards;
}
