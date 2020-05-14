// NG Components
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';

// Components
import { HomeComponent } from './home/home.component';
import { IkmeApiComponent } from './ikme-api/ikme-api.component';
import { IkmeApiNavbarComponent } from './ikme-api/ikme-api-navbar/ikme-api-navbar.component';
import { IkmeApiReadComponent } from './ikme-api/ikme-api-read/ikme-api-read.component';
import { IkmeApiCreateComponent } from './ikme-api/ikme-api-create/ikme-api-create.component';
import { IkmeApiUpdateComponent } from './ikme-api/ikme-api-update/ikme-api-update.component';
import { IkmeApiDeleteComponent } from './ikme-api/ikme-api-delete/ikme-api-delete.component';
import { PlansOverviewComponent } from './plans-overview/plans-overview.component';
import { RecentPlansComponent } from './plans-overview/recent-plans/recent-plans.component';
import { SavedPlansComponent } from './plans-overview/saved-plans/saved-plans.component';
import { PlanGridComponent } from './plans-overview/plan-grid/plan-grid.component';
import { PlanGridItemComponent } from './plans-overview/plan-grid/plan-grid-item/plan-grid-item.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PlanManagerComponent } from './plan-manager/plan-manager.component';
import { FuelPriceComponent } from './plan-manager/fuel-price/fuel-price.component';
import { PlanOverviewComponent } from './plan-manager/plan-overview/plan-overview.component';
import { QuarterEditorComponent } from './plan-manager/quarter-editor/quarter-editor.component';
import { QuarterSuggesterComponent } from './plan-manager/quarter-suggester/quarter-suggester.component';
import { FuelCapacityComponent } from './plan-manager/fuel-capacity/fuel-capacity.component';
import { FuelStabilityComponent } from './plan-manager/fuel-stability/fuel-stability.component';
import { PlanManagerToolbarComponent } from './plan-manager/plan-manager-toolbar/plan-manager-toolbar.component';

// Services
import { PlanApiService } from '@services/plan-api.service';
import { CookieService } from 'ngx-cookie-service';
import { FuelApiService } from '@services/fuel-api.service';
import { StringConvertService } from '@services/string-convert.service';
import { AuthGuard } from '@services/auth.guard';
import { AuthService } from '@services/auth.service';
import { PlanManagerService} from '@app/plan-manager/plan-manager.service'

// Prime NG Modules
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { SpinnerModule } from 'primeng/spinner';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { TabMenuModule } from 'primeng/tabmenu';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TreeTableModule } from 'primeng/treetable';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { FileUploadModule } from 'primeng/fileupload';
import { StepsModule } from 'primeng/steps';
import { DialogModule } from 'primeng/dialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import {FieldsetModule} from 'primeng/fieldset';
import {GalleriaModule} from 'primeng/galleria';

// Material Modules
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

import { IgxTimePickerModule } from 'igniteui-angular';

const firebaseConfig = {
  apiKey: "AIzaSyCSKVfx_SsstDmymeO_KtcTJORxoRg6xX8",
  authDomain: "ikme-auth.firebaseapp.com",
  databaseURL: "https://ikme-auth.firebaseio.com",
  projectId: "ikme-auth",
  storageBucket: "ikme-auth.appspot.com",
  messagingSenderId: "377983928656",
  appId: "1:377983928656:web:37a6183350fcb44e1a8455"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IkmeApiComponent,
    IkmeApiNavbarComponent,
    IkmeApiReadComponent,
    IkmeApiCreateComponent,
    IkmeApiUpdateComponent,
    IkmeApiDeleteComponent,
    PlansOverviewComponent,
    RecentPlansComponent,
    SavedPlansComponent,
    PlanGridItemComponent,
    PlanGridComponent,
    PlanManagerComponent,
    FuelPriceComponent,
    PlanOverviewComponent,
    QuarterEditorComponent,
    QuarterSuggesterComponent,
    FuelCapacityComponent,
    FuelStabilityComponent,
    PlanManagerToolbarComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    ScrollPanelModule,
    AccordionModule,
    PanelModule,
    ChartModule,
    SpinnerModule,
    InputTextModule,
    ButtonModule,
    ToolbarModule,
    HttpClientModule,
    TabMenuModule,
    KeyFilterModule,
    TreeTableModule,
    TableModule,
    TabViewModule,
    FileUploadModule,
    StepsModule,
    MatTabsModule,
    MatDialogModule,
    DialogModule,
    SplitButtonModule,
    CardModule,
    ToastModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    ProgressSpinnerModule,
    FieldsetModule,
    GalleriaModule,
    MatTooltipModule,
    IgxTimePickerModule,
    MatCardModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'apitest', component: IkmeApiComponent, canActivate: [AuthGuard] },
      { path: 'plans-overview', component: PlansOverviewComponent, canActivate: [AuthGuard] },
      { path: 'plan-manager', component: PlanManagerComponent, canActivate: [AuthGuard] },
      { path: "", redirectTo: "home", pathMatch: "full" }
    ])
  ],
  providers: [
    PlanApiService,
    AuthService,
    CookieService,
    PlanManagerService,
    StringConvertService,
    FuelApiService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
