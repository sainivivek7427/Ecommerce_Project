import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth/auth.service';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private auth: AuthService) { }

  ngOnInit(): void {
  }
  username = '';
  password = '';
  loginError = false;


    onLogin() {
    this.auth.login(this.username, this.password).subscribe({
      next: (res) => {
        this.auth.setToken(res.token);
        this.auth.setRefreshToken(res.refreshToken);
        this.showNotification('top','right',"Now redirect to dashboard",'success')
        this.router.navigate(['/dashboard']); // Redirect to dashboard
      },
      error: () => {
        // this.errorMessage = 'Invalid username or password';
        this.showNotification('top','right',"Invalid username or password",'danger')
      }
    });
  }

  //   onLogin() {
  //   if (this.username === 'admin' && this.password === 'admin') {
  //     // ✅ login successful
  //     this.loginError = false;
  //     this.showNotification('top','right',"Now redirect to dashboard",'success')
  //     this.router.navigate(['/dashboard']);
      
      
  //   } else {
  //     // ❌ login failed
  //   //   this.loginError = true;
  //     this.showNotification('top','right',"Invalid username or password",'danger')
  //   }
  // }
  showNotification(from, align,msg,errortype){
      const type = ['','info','success','warning','danger'];

      const color = Math.floor((Math.random() * 4) + 1);

      $.notify({
          icon: "notifications",
          message: msg

      },{
          type: errortype,
          timer: 2000,
          placement: {
              from: from,
              align: align
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }

}
