import { LoaderService } from '../loader.service';
import { Component } from '@angular/core';
import {AsyncPipe, NgClass} from "@angular/common";


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  standalone: true,
  imports: [
    NgClass,
    AsyncPipe
  ],
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {

  constructor( private activeLoader : LoaderService){}

  active$ =  this.activeLoader.active$;

}
