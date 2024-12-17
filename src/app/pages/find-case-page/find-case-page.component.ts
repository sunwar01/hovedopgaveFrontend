import {Component, OnInit} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DialogModule} from 'primeng/dialog';
import {FloatLabelModule} from 'primeng/floatlabel';
import {IconFieldModule} from 'primeng/iconfield';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {DatePipe, NgIf} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {Ripple} from 'primeng/ripple';
import {Select} from 'primeng/select';
import {SharedModule} from 'primeng/api';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CaseService} from '../../core/services/api/case.service';
import {Router} from '@angular/router';
import {ProductModel} from '../../core/models/productRelated/product.model';
import {CaseModel} from '../../core/models/caseRelated/case.model';
import {CaseStatus} from '../../core/enums/caseStatus.enum';

@Component({
  selector: 'app-find-case-page',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    DialogModule,
    FloatLabelModule,
    IconFieldModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputIconModule,
    InputTextModule,
    NgIf,
    ReactiveFormsModule,
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
  templateUrl: './find-case-page.component.html',
  styleUrl: './find-case-page.component.css'
})
export class FindCasePageComponent implements OnInit
{

  availableCases: CaseModel[] = [];

  caseStatus = CaseStatus;

  getStatusText(status: number): string {
    return this.caseStatus[status];
  }

  constructor(private router: Router, private caseService: CaseService)
  {
  }

  caseClicked(selectedCase: CaseModel)
  {

    this.router.navigate(['/display-case', selectedCase.id]);

  }

  ngOnInit(): void {
    this.updateCaseList();
  }

  updateCaseList()
  {
    this.caseService.getCases().subscribe((data: CaseModel[]) =>
    {
      this.availableCases = data;
    });
  }

}
