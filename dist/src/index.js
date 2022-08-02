"use strict";
/* This code was initialised by Kalix tooling.
 * As long as this file exists it will not be re-generated.
 * You are free to make changes to this file.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const kalix_javascript_sdk_1 = require("@kalix-io/kalix-javascript-sdk");
const index_1 = require("../lib/generated/index");
const server = new kalix_javascript_sdk_1.Kalix();
// This generatedComponents array contains all generated Actions, Views or Entities,
// and is kept up-to-date with any changes in your protobuf definitions.
// If you prefer, you may remove this line and manually register these components.
index_1.default.forEach((component) => {
    server.addComponent(component);
});
server.start();
