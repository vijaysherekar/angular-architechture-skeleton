import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseComponent } from './base-component';
import { StandardDataService } from './core/state-management/standard-data.service';
import { StandardData } from './core/entities/standard-data';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit, OnDestroy {
  title = 'angularArchitecture';
  standardDataSubscription: any;
  isHomePage$: boolean;
  constructor(private standardDataService: StandardDataService) {
    super();
    this.standardDataSubscription = null;
    this.isHomePage$ = true;

  }

  subscriptionList() {
    this.standardDataSubscription = this.standardDataService.standardDataChanges.subscribe((result: StandardData | null) => {
      this.logger.log(`AppComponent:subscriptionList:: called`);
      if (!result) {
        this.logger.error(`AppComponent:subscriptionList:: Received data is empty`);
        return;
      }
      if (!(result.routeName && result.routeName.toLowerCase() === "home")) {
        this.isHomePage$ = false;
        return;
      }
      this.isHomePage$ = true;
      return;
    });
  }
  ngOnInit() {
    this.logger.log(`AppComponent:ngOnInit:: called`);
    this.subscriptionList();
  }
  ngOnDestroy() {
    if (this.standardDataSubscription) {
      this.standardDataSubscription.unsubscribe();
    }
  }
}
