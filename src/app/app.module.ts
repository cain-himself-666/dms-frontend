import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AccountsModule } from './accounts/accounts.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule } from './http/http.module';
import { SharedModule } from './shared/shared.module';
import { PublicModule } from './public/public.module';
import { UtilitiesModule } from './utilities/utilities.module';
import { RepositoryModule } from './repository/repository.module';
import { tokenInterceptor } from './http/interceptors/tokeninterceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccountsModule,
    HttpModule,
    SharedModule,
    PublicModule,
    UtilitiesModule,
    RepositoryModule
  ],
  providers: [tokenInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
