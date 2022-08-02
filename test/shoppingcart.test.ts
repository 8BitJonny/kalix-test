/* This code was initialised by Kalix tooling.
 * As long as this file exists it will not be re-generated.
 * You are free to make changes to this file.
 */

import { MockEventSourcedEntity } from "@kalix-io/testkit";
import { expect } from "chai";
import shoppingcart from "../src/shoppingcart";

describe("ShoppingCart", () => {
  const entityId = "entityId";
  
  describe("AddItem", () => {
    it("should...", async () => {
      const entity = new MockEventSourcedEntity(shoppingcart, entityId);
      // TODO: you may want to set fields in addition to the entity id
      // const result = await entity.handleCommand("AddItem", { entityId });
      
      // expect(result).to.deep.equal({});
      // expect(entity.error).to.be.undefined;
      // expect(entity.state).to.deep.equal({});
      // expect(entity.events).to.deep.equal([]);
    });
  });
  
  describe("RemoveItem", () => {
    it("should...", async () => {
      const entity = new MockEventSourcedEntity(shoppingcart, entityId);
      // TODO: you may want to set fields in addition to the entity id
      // const result = await entity.handleCommand("RemoveItem", { entityId });
      
      // expect(result).to.deep.equal({});
      // expect(entity.error).to.be.undefined;
      // expect(entity.state).to.deep.equal({});
      // expect(entity.events).to.deep.equal([]);
    });
  });
  
  describe("GetCart", () => {
    it("should...", async () => {
      const entity = new MockEventSourcedEntity(shoppingcart, entityId);
      // TODO: you may want to set fields in addition to the entity id
      // const result = await entity.handleCommand("GetCart", { entityId });
      
      // expect(result).to.deep.equal({});
      // expect(entity.error).to.be.undefined;
      // expect(entity.state).to.deep.equal({});
      // expect(entity.events).to.deep.equal([]);
    });
  });
});