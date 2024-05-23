import { Component } from '@angular/core';
import {FooterComponent} from "../public/footer/footer.component";
import {HeaderComponent} from "../public/header/header.component";
import {RouterOutlet} from "@angular/router";
import {DashboardComponent} from "../dashboard/dashboard.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    RouterOutlet,
    DashboardComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
