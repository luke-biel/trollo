#!/usr/bin/env node

import { Board } from "./board";
import { Config } from "./dto/config";

let trello_token = process.env.TRELLO_TOKEN;

if (trello_token === undefined) {
    throw "Missing TRELLO_TOKEN env variable";
}

let trello_key = process.env.TRELLO_KEY;

if (trello_key === undefined) {
    throw "Missing TRELLO_KEY env variable";
}

let config: Config = {
    api_token: trello_token,
    api_key: trello_key,
};

let board = new Board(config);

board.draw();
