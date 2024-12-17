import {Component, OnInit} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DialogModule} from 'primeng/dialog';
import {FloatLabelModule} from 'primeng/floatlabel';
import {FormsModule} from '@angular/forms';
import {IconFieldModule} from 'primeng/iconfield';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {DatePipe, NgIf} from '@angular/common';
import {Ripple} from 'primeng/ripple';
import {Select} from 'primeng/select';
import {SharedModule} from 'primeng/api';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {ProductModel} from '../../core/models/productRelated/product.model';
import {CaseModel} from '../../core/models/caseRelated/case.model';
import {CaseService} from '../../core/services/api/case.service';
import {CurrentStoreService} from '../../core/services/currentStoreService/currentStore.service';
import {CaseStatus} from '../../core/enums/caseStatus.enum';
import {CaseType} from '../../core/enums/caseType.enum';
import {Router} from '@angular/router';

@Component({
  selector: 'app-show-latest-cases-page',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    DialogModule,
    FloatLabelModule,
    FormsModule,
    IconFieldModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputIconModule,
    InputTextModule,
    NgIf,
    Ripple,
    Select,
    SharedModule,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    TableModule,
    Tabs,
    ToastModule,
    DatePipe
  ],
  templateUrl: './show-latest-cases-page.component.html',
  styleUrl: './show-latest-cases-page.component.css'
})
export class ShowLatestCasesPageComponent implements OnInit {

  latestCases: CaseModel[] = [];

  caseStatus = CaseStatus;
  caseType = CaseType;

  constructor(private caseService : CaseService, private currentStore : CurrentStoreService, private router : Router) { }


  caseClicked(selectedCase: CaseModel)
  {

    this.router.navigate(['/display-case', selectedCase.id]);

  }

  getStatusText(status: number): string {
    return this.caseStatus[status];
  }

  getTypeText(type: number): string {
    return this.caseType[type];
  }

  updateLatestCases() {
    if (this.currentStore.currentStore?.id === undefined) {
      return;
    }

    this.caseService.getLatestCasesByStoreId(this.currentStore.currentStore?.id).subscribe((data) => {
      this.latestCases = data;
      console.log(this.latestCases);
    });
  }

  ngOnInit(): void {
    this.updateLatestCases();

  }



}
