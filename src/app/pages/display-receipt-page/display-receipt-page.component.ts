import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {DialogModule} from "primeng/dialog";
import {DividerModule} from "primeng/divider";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputGroupModule} from "primeng/inputgroup";
import {InputTextModule} from "primeng/inputtext";
import {ListboxModule} from "primeng/listbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Ripple} from "primeng/ripple";
import {Select} from "primeng/select";
import {SharedModule} from "primeng/api";
import {Tab, TabList, TabPanel, TabPanels, Tabs} from "primeng/tabs";
import {TableModule} from "primeng/table";
import {TextareaModule} from "primeng/textarea";
import {ToastModule} from "primeng/toast";
import {ReceiptModel} from '../../core/models/receiptRelated/receipt.model';
import {ReceiptService} from '../../core/services/api/receipt.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-display-receipt-page',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    DatePipe,
    DialogModule,
    DividerModule,
    FloatLabelModule,
    InputGroupModule,
    InputTextModule,
    ListboxModule,
    NgForOf,
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
    TextareaModule,
    ToastModule,
    FormsModule
  ],
  templateUrl: './display-receipt-page.component.html',
  styleUrl: './display-receipt-page.component.css'
})
export class DisplayReceiptPageComponent implements OnInit {

  currentReceipt : ReceiptModel | undefined = undefined;

  receiptTotal : string = "";
  receiptCaseId : string = "";
  receiptCreatedAt : string = "";
  receiptStore : string = "";
  receiptCounter : string = "";
  receiptUser : string = "";


  constructor(private receiptService : ReceiptService, private route : ActivatedRoute) { }


  updateReceipt(receiptId: number) {
    this.receiptService.GetReceipt(receiptId).subscribe(
      (receipt) => {
        console.log(receipt);
        this.currentReceipt = receipt;

        this.receiptTotal = receipt.total;
        this.receiptCaseId = receipt.caseId;
        this.receiptCreatedAt = receipt.createdAt;
        this.receiptStore = receipt.counter.store.name;
        this.receiptCounter = receipt.counter.name;
        this.receiptUser = receipt.user.name;



      }
    )

  }


  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.updateReceipt(params['receiptId']);
      console.log(params['receiptId']);
    });




  }

}
