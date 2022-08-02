"use strict";
/* This code was initialised by Kalix tooling.
 * As long as this file exists it will not be re-generated.
 * You are free to make changes to this file.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const kalix_javascript_sdk_1 = require("@kalix-io/kalix-javascript-sdk");
const entity = new kalix_javascript_sdk_1.EventSourcedEntity([
    "shopping_cart_api.proto",
    "shopping_cart_domain.proto"
], "shopping.cart.api.ShoppingCart", "shopping-cart", {
    includeDirs: ["./proto"]
});
const CartState = entity.lookupType("shopping.cart.domain.CartState");
const ItemAdded = entity.lookupType("shopping.cart.domain.ItemAdded");
const ItemRemoved = entity.lookupType("shopping.cart.domain.ItemRemoved");
entity.setInitial((entityId) => {
    return CartState.create({});
});
entity.setBehavior(state => ({
    commandHandlers: {
        AddItem(addLineItem, _cartState, context) {
            if (addLineItem.quantity < 1)
                return kalix_javascript_sdk_1.Reply.failure(`The item ${addLineItem.name} can't have quantity 0, dummy`);
            const itemAdded = ItemAdded.create({
                item: {
                    productId: addLineItem.productId,
                    name: addLineItem.name,
                    quantity: addLineItem.quantity
                }
            });
            context.emit(itemAdded);
            return kalix_javascript_sdk_1.Reply.message({});
        },
        RemoveItem(removeLineItem, cartState, context) {
            var _a;
            const existing = ((_a = cartState.items) !== null && _a !== void 0 ? _a : []).find(item => item.productId === removeLineItem.productId);
            if (!existing) {
                const id = removeLineItem.productId;
                return kalix_javascript_sdk_1.Reply.failure(`Cannot remove item ${id} because it is not in the cart.`);
            }
            else {
                const itemRemoved = ItemRemoved.create({
                    productId: removeLineItem.productId
                });
                context.emit(itemRemoved);
                return kalix_javascript_sdk_1.Reply.message({});
            }
        },
        GetCart(_getShoppingCart, cartState) {
            return kalix_javascript_sdk_1.Reply.message(cartState);
        }
    },
    eventHandlers: {
        ItemAdded(added, cart) {
            var _a, _b, _c;
            console.log({ added, cart });
            const existing = ((_a = cart.items) !== null && _a !== void 0 ? _a : []).find(item => { var _a; return item.productId === ((_a = added.item) === null || _a === void 0 ? void 0 : _a.productId); });
            if (existing && existing.quantity) {
                existing.quantity += (_c = (_b = added.item) === null || _b === void 0 ? void 0 : _b.quantity) !== null && _c !== void 0 ? _c : 0;
            }
            else if (added.item) {
                if (!cart.items)
                    cart.items = [];
                cart.items.push(added.item);
            }
            return cart;
        },
        ItemRemoved(removed, cart) {
            var _a;
            cart.items = ((_a = cart.items) !== null && _a !== void 0 ? _a : []).filter(item => item.productId !== removed.productId);
            return cart;
        }
    }
}));
exports.default = entity;
