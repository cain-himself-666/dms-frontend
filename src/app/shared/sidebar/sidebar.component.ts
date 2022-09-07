import { Renderer2,Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { LocalstorageService } from 'src/app/http/services/localstorage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private _renderer2: Renderer2, @Inject(DOCUMENT) private _document: Document, private local_storage: LocalstorageService) { }
  // group: any = this.local_storage.getUserGroup();
  ngOnInit(): void {
    let script = this._renderer2.createElement('script');
    script.type = 'text/javascript';
    script.text = "let btn = document.getElementById('btn');let sideBar = document.querySelector('.sidebar');btn.onclick=function(){sideBar.classList.toggle('closed')};let arrow = document.querySelectorAll('.arrow');for(var i=0;i<arrow.length;i++){arrow[i].addEventListener('click',(e)=>{let arrowParent = e.target.parentElement.parentElement;arrowParent.classList.toggle('showMenu')})}"
    this._renderer2.appendChild(this._document.body, script);
  }

}
