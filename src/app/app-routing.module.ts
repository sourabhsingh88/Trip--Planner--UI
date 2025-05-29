import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './components/pages/about-page/about-page.component';
import { BlogDetailsPageComponent } from './components/pages/blog-details-page/blog-details-page.component';
import { BlogPageComponent } from './components/pages/blog-page/blog-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { ContactPageComponent } from './components/pages/contact-page/contact-page.component';
import { EpisodeListPageComponent } from './components/pages/episode-list-page/episode-list-page.component';
import { FaqPageComponent } from './components/pages/faq-page/faq-page.component';
import { GalleryPageComponent } from './components/pages/gallery-page/gallery-page.component';
import { HomeDemoTwoComponent } from './components/pages/home-demo-two/home-demo-two.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { OurHostsPageComponent } from './components/pages/our-hosts-page/our-hosts-page.component';
import { PrivacyPolicyPageComponent } from './components/pages/privacy-policy-page/privacy-policy-page.component';
import { ProductDetailsPageComponent } from './components/pages/product-details-page/product-details-page.component';
import { SeasonListPageComponent } from './components/pages/season-list-page/season-list-page.component';
import { ShopPageComponent } from './components/pages/shop-page/shop-page.component';
import { SignInPageComponent } from './components/pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './components/pages/sign-up-page/sign-up-page.component';
import { SingleEpisodePageComponent } from './components/pages/single-episode-page/single-episode-page.component';
import { SingleSeasonPageComponent } from './components/pages/single-season-page/single-season-page.component';
import { SingleVideoEpisodePageComponent } from './components/pages/single-video-episode-page/single-video-episode-page.component';
import { TermsOfServicePageComponent } from './components/pages/terms-of-service-page/terms-of-service-page.component';
import { HomeDemoTwoUserComponent } from './components/pages/home-demo-two-user/home-demo-two-user.component';
import { SelectRoleComponent } from './components/pages/select-role/select-role.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { BookingPageComponent } from './components/pages/booking-page/booking-page.component';

const routes: Routes = [
    {path: '', component: HomeDemoTwoComponent},
    {path: 'index-2', component: HomeDemoTwoComponent},
    {path: 'user', component: HomeDemoTwoUserComponent},
    {path: 'about-us', component: AboutPageComponent},
    {path: 'meet-our-hosts', component: OurHostsPageComponent},
    {path: 'gallery', component: GalleryPageComponent},
    {path: 'terms-of-service', component: TermsOfServicePageComponent},
    {path: 'privacy-policy', component: PrivacyPolicyPageComponent},
    {path: 'sign-in', component: SignInPageComponent},
    {path: 'sign-up', component: SignUpPageComponent},
    {path: 'faq', component: FaqPageComponent},
    {path: 'shop', component: ShopPageComponent},
    {path: 'cart', component: CartPageComponent},
    {path: 'checkout', component: CheckoutPageComponent},
    {path: 'products-details', component: ProductDetailsPageComponent},
    {path: 'season-list', component: SeasonListPageComponent},
    {path: 'single-season', component: SingleSeasonPageComponent},
    {path: 'episode-list', component: EpisodeListPageComponent},
    {path: 'single-episode', component: SingleEpisodePageComponent},
    {path: 'single-video-episode', component: SingleVideoEpisodePageComponent},
    {path: 'blog', component: BlogPageComponent},
    {path: 'blog-details', component: BlogDetailsPageComponent},
    {path: 'contact', component: ContactPageComponent},
    {path: 'select-role', component: SelectRoleComponent},
    {path: 'profile', component: ProfileComponent},
    {path:'booking' ,component: BookingPageComponent},
    
    // Here add new pages component

    {path: '**', component: NotFoundComponent} // This line will remain down from the whole pages component list
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }