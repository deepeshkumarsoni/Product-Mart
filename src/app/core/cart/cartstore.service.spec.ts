import { TestBed } from '@angular/core/testing';
import { CartItem } from './cart-item';
import { initialState } from './cart-state';
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

  it(' Add item into the cart state',() =>{

  // Arrange
    // const currentState = initialState;  

    // expect(currentState.cartItems.length).toBe(0);
    
    const cartItem: CartItem = {
      id: 1,
      price: 2,
      name: 'Lolypop',
      imgUrl: 'img/lolypop',
      quantity: 5,
      itemTotal: 10
    };

  // Act
    cartStoreService.addCartItem(cartItem); 

    const expectedState = {
      cartItems: [cartItem]
    }

  // Assert
    expect(cartStoreService.state).toEqual(expectedState);
  });

});
