import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagenotfound',
  template: `<div class="page-wrap d-flex flex-row align-items-center">
              <div class="container">
                  <div class="row justify-content-center">
                      <div class="col-md-12 text-center">
                          <div class="text-center mt-5 mb-3">
                              <img src="assets/images/hcs_logo.png" height="250px" width="250px">
                          </div>
                          <span class="display-1 d-block">404</span>
                          <div class="mb-4 lead">The page you are looking for was not found.</div>
                          <a href="/login" class="btn btn-link">Back to Login Page</a>
                      </div>
                  </div>
              </div>
            </div>`,
})
export class PagenotfoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
