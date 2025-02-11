import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from '../../services/auth-google.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit{
  picture: string | null = null;
  email: string | null = null;
  fullName: string | null = null;
  constructor( private authGoogleService: AuthGoogleService,     private router: Router){

  }
  ngOnInit() {
    this.loadProfile(); // Initial load
    const intervalId = setInterval(() => {
      this.loadProfile(); // Load once after 100ms
      clearInterval(intervalId); // Stop the interval after the first execution
    }, 300);
  }
  opened = true;
  isMasterFileMenuOpen = false;

  toggleMasterFileMenu() {
    this.isMasterFileMenuOpen = !this.isMasterFileMenuOpen;
    
  }
  logOut(){
    this.authGoogleService.logout()
    this.router.navigate(['login']);
  }
  // loadProfile() {
  //   const claims: any = this.authGoogleService.getProfile();
  //   if (claims) {
  //     this.picture = claims.picture || null;
  //     this.email = claims.email || null;
  //     console.log('User email:', this.email);
  
  //   } else {
  //     console.log('No user profile available.');
  //   }
  // }
  loadProfile() {
    const claims: any = this.authGoogleService.getProfile();
    if (claims) {
      this.picture = claims.picture || null;
      this.fullName = claims.name || null;
      console.log('User Name:', this.fullName);
  
    } else {
      console.log('No user profile available.');
    }
  }
  
}