import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/http/services/localstorage.service';
import { HttpService } from 'src/app/http/services/http.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string = this.local_storage.getUserName();
  constructor(private http: HttpService, private local_storage: LocalstorageService, private route: Router) { }

  ngOnInit(): void {
  }
  onLogout(){
    const token:any = this.local_storage.getToken();
    this.http.logout().subscribe(data => {
      this.route.navigate(['/']);
      this.local_storage.clearSession();
    })
  }
}
