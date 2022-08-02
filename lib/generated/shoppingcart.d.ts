/* This code is managed by Kalix tooling.
 * It will be re-generated to reflect any changes to your protobuf definitions.
 * DO NOT EDIT
 */

import { EventSourcedEntity , CommandReply } from "@kalix-io/kalix-javascript-sdk";
import * as proto from "./proto";

export declare namespace api {
  type AddLineItem = proto.shopping.cart.api.AddLineItem;
  type RemoveLineItem = proto.shopping.cart.api.RemoveLineItem;
  type GetShoppingCart = proto.shopping.cart.api.GetShoppingCart;
  type IEmpty = proto.google.protobuf.IEmpty;
  type ICart = proto.shopping.cart.api.ICart;
}

export declare namespace domain {
  type CartState = proto.shopping.cart.domain.ICartState &
    protobuf.Message<proto.shopping.cart.domain.ICartState>;
  
  type ItemAdded = proto.shopping.cart.domain.IItemAdded &
    protobuf.Message<proto.shopping.cart.domain.IItemAdded>;
  
  type ItemRemoved = proto.shopping.cart.domain.IItemRemoved &
    protobuf.Message<proto.shopping.cart.domain.IItemRemoved>;
}

export declare namespace ShoppingCart {
  type State = domain.CartState;
  
  type Events =
    | domain.ItemAdded
    | domain.ItemRemoved;
  
  type EventHandlers = {
    ItemAdded: (
      event: domain.ItemAdded,
      state: State
    ) => State;
    ItemRemoved: (
      event: domain.ItemRemoved,
      state: State
    ) => State;
  };
  
  type CommandContext = EventSourcedEntity.CommandContext<Events>;
  
  type CommandHandlers = {
    AddItem: (
      command: api.AddLineItem,
      state: State,
      ctx: CommandContext
    ) => CommandReply<api.IEmpty> | Promise<CommandReply<api.IEmpty>>;
    RemoveItem: (
      command: api.RemoveLineItem,
      state: State,
      ctx: CommandContext
    ) => CommandReply<api.IEmpty> | Promise<CommandReply<api.IEmpty>>;
    GetCart: (
      command: api.GetShoppingCart,
      state: State,
      ctx: CommandContext
    ) => CommandReply<api.ICart> | Promise<CommandReply<api.ICart>>;
  };
}

export declare type ShoppingCart = EventSourcedEntity<
  ShoppingCart.State,
  ShoppingCart.Events,
  ShoppingCart.CommandHandlers,
  ShoppingCart.EventHandlers
>;
