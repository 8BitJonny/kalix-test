"use strict";
/* This code was initialised by Kalix tooling.
 * As long as this file exists it will not be re-generated.
 * You are free to make changes to this file.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const kalix_javascript_sdk_1 = require("@kalix-io/kalix-javascript-sdk");
const entity = new kalix_javascript_sdk_1.ValueEntity([
    "shopping_cart_api.proto",
    "counter_domain.proto",
    "shopping_cart_domain.proto",
    "counter_api.proto"
], "counter.api.CounterService", "counter", {
    includeDirs: ["./proto"]
});
const CounterState = entity.lookupType("counter.domain.CounterState");
entity.setInitial(entityId => CounterState.create({}));
function updateState(context, state) {
    context.updateState(state);
    return kalix_javascript_sdk_1.Reply.message(state);
}
entity.setCommandHandlers({
    UpCounter(command, state, ctx) {
        state.value = (state.value || 0) + 1;
        return updateState(ctx, state);
    },
    DownCounter(command, state, ctx) {
        state.value = (state.value || 0) - 1;
        return updateState(ctx, state);
    },
    HalfCounter(command, state, ctx) {
        state.value = (state.value || 0) / 2;
        return updateState(ctx, state);
    },
    ResetCounter(command, state, ctx) {
        state.value = 0;
        return updateState(ctx, state);
    },
    GetCounter(command, state, ctx) {
        return kalix_javascript_sdk_1.Reply.message(state);
    },
    SetCounter(command, state, ctx) {
        state.value = command.value;
        return updateState(ctx, state);
    }
});
exports.default = entity;
