import { CartItemInterface } from "./cart-item";
import { CartState } from "./cart-state";
import { getCartItemsCount, getIsItemAlreadyInCart } from "./cartSelectors";

const given = beforeEach;
const when = beforeEach;
const then = it;

describe("Cart Store Selectors", () => {
  describe("Get Cart Items Count", () => {
    let cartState: CartState;
    let result: number;
    given(() => {
      const tenApples: CartItemInterface = {
        id: 1,
        quantity: 10,
        imgUrl: "img/apple",
        itemTotal: 20,
        name: "apple",
        price: 2
      };
      const fiveOranges: CartItemInterface = {
        id: 1,
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

  it('can find item in cart',()=>{
    const itemInCart1: CartItemInterface = {
      id: 1,
      quantity: 10,
      imgUrl: "img/apple",
      itemTotal: 20,
      name: "apple",
      price: 2
    };
    const itemInCart2: CartItemInterface = {
      id: 2,
      quantity: 5,
      imgUrl: "img/orange",
      itemTotal: 20,
      name: "orange",
      price: 2
    };
    const state: CartState = {
      cartItems: [itemInCart1,itemInCart2]
    };
    const itemExist = getIsItemAlreadyInCart(2)(state);
    expect(itemExist).toBeTruthy();

    const itemExist1 = getIsItemAlreadyInCart(3)(state);
    expect(itemExist1).toBeFalsy();
  });
});