import {Component, OnInit} from '@angular/core';
import {CardModule} from 'primeng/card';
import {DatePipe} from '@angular/common';
import {SharedModule} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CaseModel} from '../../core/models/caseRelated/case.model';
import {CaseStatus} from '../../core/enums/caseStatus.enum';
import {CaseType} from '../../core/enums/caseType.enum';
import {CaseService} from '../../core/services/api/case.service';
import {CurrentStoreService} from '../../core/services/currentStoreService/currentStore.service';
import {Router} from '@angular/router';
import {ReceiptModel} from '../../core/models/receiptRelated/receipt.model';
import {ReceiptService} from '../../core/services/api/receipt.service';

@Component({
  selector: 'app-show-latest-receipts-page',
  standalone: true,
  imports: [
    CardModule,
    DatePipe,
    SharedModule,
    TableModule,
    ToastModule
  ],
  templateUrl: './show-latest-receipts-page.component.html',
  styleUrl: './show-latest-receipts-page.component.css'
})
export class ShowLatestReceiptsPageComponent implements OnInit {

  latestReceipts: ReceiptModel[] = [];

  constructor(private receiptService : ReceiptService, private currentStore : CurrentStoreService, private router : Router) { }


  receiptClicked(selectedReceipt: ReceiptModel)
  {

    this.router.navigate(['/display-receipt', selectedReceipt.id]);

  }


  updateLatestReceipts() {
    if (this.currentStore.currentStore?.id === undefined) {
      return;
    }

    this.receiptService.GetLatestReceipts(this.currentStore.currentStore?.id).subscribe((data) => {
      this.latestReceipts = data;
      console.log(this.latestReceipts);
    });
  }

  ngOnInit(): void {
    this.updateLatestReceipts();

  }



}
