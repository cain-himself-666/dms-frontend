import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search: string = '';
  constructor(private http: HttpService) { }

  ngOnInit(): void {
  }

  onSearch(query:any){
    this.search = '';
    this.http.search(query.query).subscribe(data => {
      console.log(data);
    })
  }
}
