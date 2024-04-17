import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public dashboard!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor(
    private authService: AuthService,
    private menu_controller: MenuController
  ) {}

  ngOnInit() {
    this.dashboard = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.menu_controller.enable(true)
  }
}
