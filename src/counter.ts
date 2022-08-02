/* This code was initialised by Kalix tooling.
 * As long as this file exists it will not be re-generated.
 * You are free to make changes to this file.
 */

import { ValueEntity, Reply } from "@kalix-io/kalix-javascript-sdk";
import { CounterService } from "../lib/generated/counter";

const entity: CounterService = new ValueEntity(
  [
    "shopping_cart_api.proto",
    "counter_domain.proto",
    "shopping_cart_domain.proto",
    "counter_api.proto"
  ],
  "counter.api.CounterService",
  "counter",
  {
    includeDirs: ["./proto"]
  }
);

const CounterState = entity.lookupType("counter.domain.CounterState");

entity.setInitial(entityId => CounterState.create({}));

function updateState(
  context: CounterService.CommandContext,
  state: CounterService.State
): Reply<CounterService.State> {
  context.updateState(state);
  return Reply.message(state);
}

entity.setCommandHandlers({
  UpCounter(command, state, ctx) {
    state.value = (state.value || 0) + 1
    return updateState(ctx, state)
  },
  DownCounter(command, state, ctx) {
    state.value = (state.value || 0) - 1
    return updateState(ctx, state)
  },
  HalfCounter(command, state, ctx) {
    state.value = (state.value || 0) / 2
    return updateState(ctx, state)
  },
  ResetCounter(command, state, ctx) {
    state.value = 0
    return updateState(ctx, state)
  },
  GetCounter(command, state, ctx) {
    return Reply.message(state);
  },
  SetCounter(command, state, ctx) {
    state.value = command.value
    return updateState(ctx, state)
  }
});


export default entity;
