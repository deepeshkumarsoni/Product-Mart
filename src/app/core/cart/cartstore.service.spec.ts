import { TestBed } from '@angular/core/testing';
import { CartItemInterface } from './cart-item';
import { CartState, initialState } from './cart-state';
import { CartStoreService } from './cartstore.service';

describe('CartstoreService', () => {
  let cartStoreService: CartStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    cartStoreService = TestBed.inject(CartStoreService);
  });

  it('should be created', () => {
    expect(cartStoreService).toBeTruthy();
  });

  it(' Add item into the cart state', () => {
    // Arrange
    // const currentState = initialState;
    // expect(currentState.cartItems.length).toBe(0);

    const cartItem: CartItemInterface = {
      productId: 1,
      price: 5,
      name: 'Mango',
      imgUrl: 'img/Mango',
      quantity: 5,
      itemTotal: 25,
    };

    // Act
    cartStoreService.addCartItem(cartItem);

    const currentState = {
      cartItems: [cartItem],
    };

    // Assert
    expect(cartStoreService.state).toEqual(currentState);

    // Act
    cartStoreService.clearStore();

    // Assert
    expect(cartStoreService.state).toEqual(initialState);

  });

  it(' Restore item into the cart ', () => {
  //#region  Arrange
    const currentState = initialState;
    
    expect(cartStoreService.state).toEqual(currentState);

    const cartItem: CartItemInterface = {
      productId: 1,
      price: 5,
      name: 'Mango',
      imgUrl: 'img/Mango',
      quantity: 5,
      itemTotal: 25,
    };

    const expectedState: CartState ={
      cartItems: [cartItem]
    }; 
    //#endregion

  //#region  Act
    cartStoreService.restoreCart(expectedState);
    //#endregion

  //#region Assert
    expect(cartStoreService.state).toEqual(expectedState);
    //#endregion
  });

  it(' Delete item from cart ', () => {
    //#region  Arrange     
      const cartItem1: CartItemInterface = {
        productId: 1,
        price: 5,
        name: 'Mango',
        imgUrl: 'img/Mango',
        quantity: 5,
        itemTotal: 25,
      };
      const cartItem2: CartItemInterface = {
        productId: 2,
        price: 6,
        name: 'Apple',
        imgUrl: 'img/Apple',
        quantity: 5,
        itemTotal: 30,
      };
      const currentState: CartState ={
        cartItems: [cartItem1,cartItem2]
      }; 

      cartStoreService.restoreCart(currentState);

      expect(cartStoreService.state).toEqual(currentState);
      //#endregion
        
    //#region  Act
      cartStoreService.removeCartItem(cartItem2);
      //#endregion
  
    //#region Assert
    const expectedState: CartState = {
      cartItems:[cartItem1]
    }
      expect(cartStoreService.state).toEqual(expectedState);
      //#endregion
    });  

  it(' Update item to cart ', () => {
      //#region  Arrange     
        const cartItem1: CartItemInterface = {
          productId: 1,
          price: 5,
          name: 'Mango',
          imgUrl: 'img/Mango',
          quantity: 5,
          itemTotal: 25,
        };
        const cartItem2: CartItemInterface = {
          productId: 2,
          price: 6,
          name: 'Apple',
          imgUrl: 'img/Apple',
          quantity: 5,
          itemTotal: 30,
        };
        const currentState: CartState ={
          cartItems: [cartItem1,cartItem2]
        }; 
  
      cartStoreService.restoreCart(currentState);
  
      expect(cartStoreService.state).toEqual(currentState);
        //#endregion
          
      //#region  Act
      const cartItemToUpdate: CartItemInterface = {
        productId: 1,
        price: 5,
        name: 'Mango',
        imgUrl: 'img/Mango',
        quantity: 10,
        itemTotal: 50,
      };

      cartStoreService.updateCartItem(cartItemToUpdate);
        //#endregion
    
      //#region Assert
      const expectedState: CartState = {
        cartItems:[cartItemToUpdate,cartItem2]
      };

      expect(cartStoreService.state).toEqual(expectedState);
        //#endregion
      });  

});
