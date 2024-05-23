import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent implements OnInit{

  constructor(private _router: Router) {
  }

  navigateTo(): void {
    this._router.navigateByUrl("/auth").then();
  }

  ngOnInit(): void {
  }
}
