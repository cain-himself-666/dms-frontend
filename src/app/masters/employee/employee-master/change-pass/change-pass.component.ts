import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpService } from 'src/app/http/services/http.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {
  @Output() hidePass: any = new EventEmitter<{status: boolean}>();
  @Input() username: string = '';
  @Input() id: string = '';
  e_username:string = '';
  password1: string = '';
  password2: string = '';
  user_id: string = '';
  showPassUpdate: boolean = false;
  showError: boolean = false;
  notifier = new Subject();
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.e_username = this.username;
    this.user_id = this.id
  }
  onHidePasswordForm(){
    this.hidePass.emit({
      status: true
    })
  }
  onUpdatePassword(data:any){
    if(!data.valid){
      data.control.markAllAsTouched();
    }
    else{
      let fd = new FormData();
      fd.append('id', this.user_id);
      fd.append('password', this.password1);
      fd.append('password2', this.password2);
      this.http.update_user(fd).pipe(takeUntil(this.notifier)).subscribe(data => {
        this.showPassUpdate = true;
      },err => {
        this.showError = true;
      })
    }
  }
}
