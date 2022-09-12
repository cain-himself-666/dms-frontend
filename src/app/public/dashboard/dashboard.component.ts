import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/http/services/localstorage.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private local_storage: LocalstorageService) { }

  ngOnInit(): void {
    // this.local_storage.getUserGroup();
    // this.local_storage.getUserName();
  }

}
