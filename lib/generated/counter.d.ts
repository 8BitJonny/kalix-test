/* This code is managed by Kalix tooling.
 * It will be re-generated to reflect any changes to your protobuf definitions.
 * DO NOT EDIT
 */

import { ValueEntity , CommandReply } from "@kalix-io/kalix-javascript-sdk";
import * as proto from "./proto";

export declare namespace api {
  type UpByOne = proto.counter.api.UpByOne;
  type DownByOne = proto.counter.api.DownByOne;
  type Half = proto.counter.api.Half;
  type Reset = proto.counter.api.Reset;
  type Get = proto.counter.api.Get;
  type Set = proto.counter.api.Set;
  type ICounter = proto.counter.api.ICounter;
}

export declare namespace domain {
  type CounterState = proto.counter.domain.ICounterState &
    protobuf.Message<proto.counter.domain.ICounterState>;
}

export declare namespace CounterService {
  type State = domain.CounterState;
  
  type CommandContext = ValueEntity.CommandContext<State>;
  
  type CommandHandlers = {
    UpCounter: (
      command: api.UpByOne,
      state: State,
      ctx: CommandContext
    ) => CommandReply<api.ICounter> | Promise<CommandReply<api.ICounter>>;
    DownCounter: (
      command: api.DownByOne,
      state: State,
      ctx: CommandContext
    ) => CommandReply<api.ICounter> | Promise<CommandReply<api.ICounter>>;
    HalfCounter: (
      command: api.Half,
      state: State,
      ctx: CommandContext
    ) => CommandReply<api.ICounter> | Promise<CommandReply<api.ICounter>>;
    ResetCounter: (
      command: api.Reset,
      state: State,
      ctx: CommandContext
    ) => CommandReply<api.ICounter> | Promise<CommandReply<api.ICounter>>;
    GetCounter: (
      command: api.Get,
      state: State,
      ctx: CommandContext
    ) => CommandReply<api.ICounter> | Promise<CommandReply<api.ICounter>>;
    SetCounter: (
      command: api.Set,
      state: State,
      ctx: CommandContext
    ) => CommandReply<api.ICounter> | Promise<CommandReply<api.ICounter>>;
  };
}

export declare type CounterService = ValueEntity<
  CounterService.State,
  CounterService.CommandHandlers
>;
