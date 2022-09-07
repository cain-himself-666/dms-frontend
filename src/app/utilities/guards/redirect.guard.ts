import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalstorageService } from 'src/app/http/services/localstorage.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate {
  constructor(private local_storage: LocalstorageService, private route: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.local_storage.getToken()){
      return true;
    }
    alert('Please login to access dashboard.');
    this.route.navigate(['/']);
    return false;
  }
  
}
