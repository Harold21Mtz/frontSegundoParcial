import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {

  if (typeof window !== 'undefined') {
    const router = inject(Router);
    const token = localStorage.getItem("accessToken");
    if (token) {
      // router.navigateByUrl('/principal').then();
      return true;
    } else {
      router.navigateByUrl('/auth').then();
      return false;
    }
  }
  return true;
};

