import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { CartItemInterface } from '@core/cart/cart-item';
import { CartService } from '@core/cart/cart.service';
import {
  getCartItems,
  getCartItemsCount,
  getCartSubTotal,
  getEstimatedTax,
  getOrderTotal,
  getShippingCost,
} from '@core/cart/cartSelectors';
import { CartStoreService } from '@core/cart/cartstore.service';
import { LogService } from '@core/log.service';
import { OrderService } from '@core/orders/orderService';
import { combineLatest, Subscription } from 'rxjs';

declare let paypal: any;

@Component({
  selector: 'app-paypalcheckout',
  templateUrl: './paypalcheckout.component.html',
  styleUrls: ['./paypalcheckout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaypalcheckoutComponent implements OnInit, OnDestroy {
  
  orderTotalSubscription: Subscription;

  orderTotal: number = 0;
  cartItems: CartItemInterface[];
  shippingCost: number;
  itemsCount: number;
  orderSubTotal: number;
  estimatedTax: number;

  constructor(
    private cartService: CartService,
    private router: Router,
    private cartStore: CartStoreService,
    private logService: LogService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    // get order details, we will use heigher Order observable operator
    // combinelatest to get all order properties.
    this.orderTotalSubscription = combineLatest(
      [this.cartStore.select(getOrderTotal),
      this.cartStore.select(getCartItems),
      this.cartStore.select(getShippingCost),
      this.cartStore.select(getCartItemsCount),
      this.cartStore.select(getEstimatedTax),
      this.cartStore.select(getCartSubTotal)]
    ).subscribe(
      ([
        orderTotal,
        cartItems,
        shippingCost,
        itemsCount,
        estimatedTax,
        orderSubTotal,
      ]) => {
        this.logService.log(`Order Total is`, orderTotal);
        this.logService.log(`Cart Items`, cartItems);

        this.orderTotal = orderTotal as number;
        this.cartItems = cartItems as CartItemInterface[];
        this.shippingCost = shippingCost as number; 
        this.itemsCount = itemsCount as number;
        this.estimatedTax = estimatedTax as number;
        this.orderSubTotal = orderSubTotal as number;
      }
    );

    // render paypal button pass paypal configuration.
    paypal.Button.render(this.paypalConfig, '#paypal-button-container');
  }

  ngOnDestroy() {
    if (this.orderTotalSubscription) {
      this.orderTotalSubscription.unsubscribe();
    }
  }

  get paypalConfig() {
    return {
      style: { size: 'responsive' },
      env: 'sandbox',
      client: {
        sandbox:
          'AWpON3txikvng2lGWNSa2UCo6jomC8ShS_G1mAMNCV6r8wZlR02MDk-MKS_fiJ027Ud8JwWLzx1af8ue',
      },
      commit: true,
      payment: (data, actions) => {
        return actions.payment.create({
          payment: {
            transactions: [
              {
                amount: {
                  total: this.orderTotal,
                  currency: 'USD', // in production you may want to support other currency.
                },
              },
            ],
          },
        });
      },
      onAuthorize: (data, actions) => {
        // clear cart
        // navigate to shopping page
        return actions.payment.execute().then((payment) => {
          this.logService.log(`The payment is successful`, payment);

          const { cart: cartId, id: paymentId } = payment;

          const {
            orderTotal,
            cartItems,
            shippingCost,
            itemsCount,
            estimatedTax,
            orderSubTotal,
          } = this;

          this.orderService
            .submitOrder({
              cartId,
              cartItems,
              orderTotal,
              paymentId,
              shippingCost,
              itemsCount,
              estimatedTax,
              orderSubTotal,
            })
            .subscribe((orderId) => {
              this.logService.log('Order created successfully', orderId);

              this.cartService.clearCart();

              this.logService.log('Redirecting to Thankyou Page.', orderId);

              this.router.navigate(['/home']);
            });
        });
      },
      onCancel: (data) => {
        this.logService.log(`The payment is cancelled`, data);
      },
      onError: (error) => {
        this.logService.log(`Payment Error`, error);
      },
    };
  }
}
