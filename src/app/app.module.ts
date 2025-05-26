import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { LightgalleryModule } from 'lightgallery/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeDemoTwoComponent } from './components/pages/home-demo-two/home-demo-two.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { BlogComponent } from './components/common/blog/blog.component';
import { FeaturedShowsComponent } from './components/common/featured-shows/featured-shows.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { LatestEpisodesComponent } from './components/common/latest-episodes/latest-episodes.component';
import { MostPopularComponent } from './components/common/most-popular/most-popular.component';
import { OurHostsComponent } from './components/common/our-hosts/our-hosts.component';
import { OurSponsorsComponent } from './components/common/our-sponsors/our-sponsors.component';
import { ProductsComponent } from './components/common/products/products.component';
import { SubscribeComponent } from './components/common/subscribe/subscribe.component';
import { SupportOurChannelComponent } from './components/common/support-our-channel/support-our-channel.component';
import { TestimonialsComponent } from './components/common/testimonials/testimonials.component';
import { MustWatchEpisodesComponent } from './components/common/must-watch-episodes/must-watch-episodes.component';
import { ContactPageComponent } from './components/pages/contact-page/contact-page.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';
import { GalleryPageComponent } from './components/pages/gallery-page/gallery-page.component';
import { TermsOfServicePageComponent } from './components/pages/terms-of-service-page/terms-of-service-page.component';
import { PrivacyPolicyPageComponent } from './components/pages/privacy-policy-page/privacy-policy-page.component';
import { OurHostsPageComponent } from './components/pages/our-hosts-page/our-hosts-page.component';
import { AboutPageComponent } from './components/pages/about-page/about-page.component';
import { BlogPageComponent } from './components/pages/blog-page/blog-page.component';
import { BlogDetailsPageComponent } from './components/pages/blog-details-page/blog-details-page.component';
import { SignInPageComponent } from './components/pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './components/pages/sign-up-page/sign-up-page.component';
import { FaqPageComponent } from './components/pages/faq-page/faq-page.component';
import { ShopPageComponent } from './components/pages/shop-page/shop-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { ProductDetailsPageComponent } from './components/pages/product-details-page/product-details-page.component';
import { SeasonListPageComponent } from './components/pages/season-list-page/season-list-page.component';
import { SingleSeasonPageComponent } from './components/pages/single-season-page/single-season-page.component';
import { EpisodeListPageComponent } from './components/pages/episode-list-page/episode-list-page.component';
import { SingleEpisodePageComponent } from './components/pages/single-episode-page/single-episode-page.component';
import { VideoEpisodesComponent } from './components/common/video-episodes/video-episodes.component';
import { SingleVideoEpisodePageComponent } from './components/pages/single-video-episode-page/single-video-episode-page.component';
import { HometwoBannerComponent } from './components/pages/home-demo-two/hometwo-banner/hometwo-banner.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './service/user-service';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { NavbarUserComponent } from './components/common/navbar-user/navbar-user.component';
import { HomeDemoTwoUserComponent } from './components/pages/home-demo-two-user/home-demo-two-user.component';
import { HometwoBannerUserComponent } from './components/pages/home-demo-two-user/hometwo-banner-user/hometwo-banner-user.component';
import { NavbarPlannerComponent } from './components/common/navbar-planner/navbar-planner.component';
import { SelectRoleComponent } from './components/pages/select-role/select-role.component';
import { ProfileComponent } from './components/pages/profile/profile.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeDemoTwoComponent,
		HometwoBannerComponent,
		HomeDemoTwoUserComponent,
		HometwoBannerUserComponent,
		NavbarComponent,
		BlogComponent,
		FeaturedShowsComponent,
		FooterComponent,
		LatestEpisodesComponent,
		MostPopularComponent,
		OurHostsComponent,
		OurSponsorsComponent,
		ProductsComponent,
		SubscribeComponent,
		SupportOurChannelComponent,
		TestimonialsComponent,
  		MustWatchEpisodesComponent,
		ContactPageComponent,
		NotFoundComponent,
		GalleryPageComponent,
		TermsOfServicePageComponent,
		PrivacyPolicyPageComponent,
		OurHostsPageComponent,
		AboutPageComponent,
		BlogPageComponent,
		BlogDetailsPageComponent,
		SignInPageComponent,
		SignUpPageComponent,
		FaqPageComponent,
		ShopPageComponent,
		CartPageComponent,
		CheckoutPageComponent,
		ProductDetailsPageComponent,
		SeasonListPageComponent,
		SingleSeasonPageComponent,
		EpisodeListPageComponent,
		SingleEpisodePageComponent,
		VideoEpisodesComponent,
		SingleVideoEpisodePageComponent,
		NavbarUserComponent,
		NavbarPlannerComponent,
		SelectRoleComponent,
		ProfileComponent
	],
	imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CarouselModule,
        FormsModule,
        ReactiveFormsModule,
        NgxScrollTopModule,
		LightgalleryModule,
		HttpClientModule,
		MatSelectModule,
		MatIconModule,

	],
	providers:[
        UserService
    ],
	bootstrap: [AppComponent]
})
export class AppModule { }