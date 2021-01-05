import { CartItemInterface } from "./cart-item";
import { CartState } from "./cart-state";
import { getCartItemsCount } from "./cartSelectors";

const given = beforeEach;
const when = beforeEach;
const then = it;

describe("Cart Store Selectors", () => {
  describe("Get Cart Items Count", () => {
    let cartState: CartState;
    let result: number;
    given(() => {
      const tenApples: CartItemInterface = {
        productId: 1,
        quantity: 10,
        imgUrl: "img/apple",
        itemTotal: 20,
        name: "apple",
        price: 2
      };
      const fiveOranges: CartItemInterface = {
        productId: 1,
        quantity: 5,
        imgUrl: "img/orange",
        itemTotal: 20,
        name: "orange",
        price: 2
      };
      cartState = {
        cartItems: [tenApples, fiveOranges]
      };
    });
    when(() => {
      result = getCartItemsCount(cartState);
    });
    then("I can see my total cart items count", () => {
      expect(result).toBe(15);
    });
  });
});