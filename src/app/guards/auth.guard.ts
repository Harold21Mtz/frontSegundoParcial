import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import {MatDialog} from "@angular/material/dialog";

export const authGuard: CanActivateFn = (route, state) => {

  if (typeof window !== 'undefined') {
    const router = inject(Router);
    const dialog = inject(MatDialog);
    const token = localStorage.getItem("accessToken");
    if (token) {
      return true;
    } else {
      router.navigateByUrl('/auth').then()
      console.log("asd")
      dialog.closeAll();
      return false;
    }
  }
  return true;
};

