import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '@core/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input()
  user: User;

  @Output()
  logoutEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
