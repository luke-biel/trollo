#!/usr/bin/env node

import { Board } from "./board";
import { Config } from "./dto/config";

let trelloToken = process.env.TRELLO_TOKEN;

if (trelloToken === undefined) {
    throw "Missing TRELLO_TOKEN env variable";
}

let trelloKey = process.env.TRELLO_KEY;

if (trelloKey === undefined) {
    throw "Missing TRELLO_KEY env variable";
}

let config: Config = {
    apiToken: trelloToken,
    apiKey: trelloKey
};

let board = new Board(config);

board.init();
