import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SignupPage } from './signup/signup.page';
import { ProfilePage } from './profile/profile.page';
import { WelcomePage } from './welcome/welcome.page';
import { LoginPage } from './login/login.page';
import { HomePage } from './home/home.page';
import { ItemDetailsPage } from './item-details/item-details.page';
import { MyCartPage } from './my-cart/my-cart.page';
import { MyOrdersPage } from './my-orders/my-orders.page';
import { CheckoutPage } from './checkout/checkout.page';
import { ConfirmPage } from './confirm/confirm.page';
import { AdminOrdersPage } from './admin-orders/admin-orders.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupPage
  },
  {
    path: 'profile',
    component: ProfilePage
  },
  {
    path: 'welcome',
    component: WelcomePage
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'item-details/:id',
    component: ItemDetailsPage
  },
  {
    path: 'my-cart',
    component: MyCartPage
  },
  {
    path: 'my-orders',
    component: MyOrdersPage
  },
  {
    path: 'checkout',
    component: CheckoutPage
  },
  {
    path: 'confirm',
    component: ConfirmPage
  },
  {
    path: 'admin-orders',
    component: AdminOrdersPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  declarations: [
    SignupPage,
    ProfilePage,
    WelcomePage,
    LoginPage,
    HomePage,
    ItemDetailsPage,
    MyCartPage,
    MyOrdersPage,
    CheckoutPage,
    ConfirmPage,
    AdminOrdersPage
  ]
})
export class AppRoutingModule {}
