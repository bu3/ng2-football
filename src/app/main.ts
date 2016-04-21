import {bootstrap}    from 'angular2/platform/browser'
import {HTTP_PROVIDERS} from "angular2/http";
import 'rxjs/Rx'
import {AppComponent} from "./app.component";
import {ApiClient} from "./teams/football.api.client";

bootstrap(AppComponent, [HTTP_PROVIDERS, ApiClient]);
