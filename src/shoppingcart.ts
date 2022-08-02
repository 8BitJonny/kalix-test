/* This code was initialised by Kalix tooling.
 * As long as this file exists it will not be re-generated.
 * You are free to make changes to this file.
 */

import { EventSourcedEntity, Reply } from "@kalix-io/kalix-javascript-sdk";
import { ShoppingCart } from "../lib/generated/shoppingcart";
import { api, domain } from "../lib/generated/shoppingcart";

const entity: ShoppingCart = new EventSourcedEntity(
  [
    "shopping_cart_api.proto",
    "shopping_cart_domain.proto"
  ],
  "shopping.cart.api.ShoppingCart",
  "shopping-cart",
  {
    includeDirs: ["./proto"]
  }
);

const CartState = entity.lookupType("shopping.cart.domain.CartState");
const ItemAdded = entity.lookupType("shopping.cart.domain.ItemAdded");
const ItemRemoved = entity.lookupType("shopping.cart.domain.ItemRemoved");

entity.setInitial((entityId) => {
  return CartState.create({})
});

entity.setBehavior(state => ({
  commandHandlers: {
    AddItem(addLineItem, _cartState, context) {
      if (addLineItem.quantity < 1) return Reply.failure(`The item ${addLineItem.name} can't have quantity 0, dummy`);
  
      const itemAdded = ItemAdded.create({
        item: {
          productId: addLineItem.productId,
          name: addLineItem.name,
          quantity: addLineItem.quantity
        }
      })
      context.emit(itemAdded)
      return Reply.message({});
    },
    RemoveItem(removeLineItem, cartState, context) {
      const existing = (cartState.items ?? []).find(item =>
        item.productId === removeLineItem.productId
      );
    
      if (!existing) {
        const id = removeLineItem.productId;
        return Reply.failure(
          `Cannot remove item ${id} because it is not in the cart.`
        );
      } else {
        const itemRemoved = ItemRemoved.create({
          productId: removeLineItem.productId
        });
        context.emit(itemRemoved);
        return Reply.message({});
      }
    },
    GetCart(_getShoppingCart, cartState) {
      return Reply.message(cartState);
    }
  },
  
  eventHandlers: {
    ItemAdded(added: domain.ItemAdded, cart: domain.CartState) {
      console.log({ added, cart })
      const existing = (cart.items ?? []).find(item =>
        item.productId === added.item?.productId
      );
    
      if (existing && existing.quantity) {
        existing.quantity += added.item?.quantity ?? 0;
      } else if (added.item) {
        if (!cart.items) cart.items = [];
        cart.items.push(added.item);
      }
    
      return cart;
    },
    ItemRemoved(removed, cart) {
      cart.items = (cart.items ?? []).filter(item =>
        item.productId !== removed.productId
      );
    
      return cart;
    }
  }
}));


export default entity;
