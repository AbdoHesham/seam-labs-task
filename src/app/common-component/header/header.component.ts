import { Component, OnInit } from '@angular/core';

import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  // standalone: true,
  // imports: [NgbCollapseModule, RouterLink],
})
export class HeaderComponent implements OnInit {
  constructor() {}
  expanded = false;
  isMenuCollapsed = true;

  toggleExpanded() {
    this.expanded = !this.expanded;
  }

  ngOnInit(): void {}
}
