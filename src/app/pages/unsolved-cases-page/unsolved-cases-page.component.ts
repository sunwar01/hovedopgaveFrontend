import {Component, OnInit} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DatePipe, KeyValuePipe, NgForOf, NgIf} from '@angular/common';
import {DialogModule} from 'primeng/dialog';
import {DividerModule} from 'primeng/divider';
import {FloatLabelModule} from 'primeng/floatlabel';
import {FormsModule} from '@angular/forms';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputTextModule} from 'primeng/inputtext';
import {ListboxModule} from 'primeng/listbox';
import {Ripple} from 'primeng/ripple';
import {SharedModule} from 'primeng/api';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {TableModule} from 'primeng/table';
import {TextareaModule} from 'primeng/textarea';
import {ToastModule} from 'primeng/toast';
import {CaseModel} from '../../core/models/caseRelated/case.model';
import {CaseService} from '../../core/services/api/case.service';
import {CurrentStoreService} from '../../core/services/currentStoreService/currentStore.service';
import {CaseType} from '../../core/enums/caseType.enum';
import {Router} from '@angular/router';
import {CaseStatus} from '../../core/enums/caseStatus.enum';

@Component({
  selector: 'app-unsolved-cases-page',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    DatePipe,
    DialogModule,
    DividerModule,
    FloatLabelModule,
    FormsModule,
    InputGroupModule,
    InputTextModule,
    ListboxModule,
    NgForOf,
    NgIf,
    Ripple,
    SharedModule,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    TableModule,
    Tabs,
    TextareaModule,
    ToastModule,
    KeyValuePipe
  ],
  templateUrl: './unsolved-cases-page.component.html',
  styleUrl: './unsolved-cases-page.component.css'
})
export class UnsolvedCasesPageComponent implements OnInit {

  allCases: CaseModel[] = [];



  caseTypes = CaseType;

  caseStatus = CaseStatus;





  constructor(private caseService : CaseService, private currentStoreService : CurrentStoreService, private router: Router ) { }


  getCasesByStatus(caseStatus: CaseStatus): CaseModel[] {
    return this.allCases.filter(c => c.status === caseStatus);
  }

  caseClicked(selectedCase: CaseModel)
  {

    this.router.navigate(['/display-case', selectedCase.id]);

  }

  getStatusText(status: number): string {
    return this.caseStatus[status];
  }

  getTypeText(type: number): string {
    return this.caseTypes[type];
  }

  updateCases() {
    if (this.currentStoreService.currentStore?.id === undefined) {
      return;
    }

    this.caseService.getLatestCasesByStoreId(this.currentStoreService.currentStore?.id).subscribe(cases => {
      this.allCases = cases;
      console.log(this.allCases);
    });
  }

  ngOnInit(): void {


    this.updateCases();

  }

  protected readonly CaseStatus = CaseStatus;
}
