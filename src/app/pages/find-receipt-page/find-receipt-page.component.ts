import {Component, OnInit} from '@angular/core';
import {CardModule} from 'primeng/card';
import {DatePipe, NgIf} from '@angular/common';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {SharedModule} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CaseModel} from '../../core/models/caseRelated/case.model';
import {ReceiptModel} from '../../core/models/receiptRelated/receipt.model';
import {ReceiptService} from '../../core/services/api/receipt.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-find-receipt-page',
  standalone: true,
  imports: [
    CardModule,
    DatePipe,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    NgIf,
    SharedModule,
    TableModule,
    ToastModule
  ],
  templateUrl: './find-receipt-page.component.html',
  styleUrl: './find-receipt-page.component.css'
})
export class FindReceiptPageComponent implements OnInit {

  availableReceipts: ReceiptModel[] = [];

  constructor(private receiptService : ReceiptService, private router: Router) { }

  receiptClicked(receipt: ReceiptModel) {
    this.router.navigate(['/display-receipt', receipt.id]);

  }

  updateAvailableReceipts() {
    this.receiptService.GetReceipts().subscribe(receipts => {
      this.availableReceipts = receipts;
    });
  }

  ngOnInit(): void {
    this.updateAvailableReceipts();
  }

}
