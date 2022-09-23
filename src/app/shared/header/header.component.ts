import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/http/services/localstorage.service';
import { HttpService } from 'src/app/http/services/http.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string = this.local_storage.getUserName();
  notifier = new Subject();
  constructor(private http: HttpService, private local_storage: LocalstorageService, private route: Router) { }

  ngOnInit(): void {
  }
  onLogout(){
    this.http.logout().pipe(takeUntil(this.notifier)).subscribe(data => {
      this.local_storage.clearSession();
      window.location.href="/login"
    })
  }
}
