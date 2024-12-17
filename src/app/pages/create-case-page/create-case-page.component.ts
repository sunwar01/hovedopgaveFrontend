import {Component, OnInit} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DialogModule} from 'primeng/dialog';
import {FormsModule} from '@angular/forms';
import {IconFieldModule} from 'primeng/iconfield';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {NgIf} from '@angular/common';
import {Ripple} from 'primeng/ripple';
import {SharedModule} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {FloatLabelModule} from 'primeng/floatlabel';
import {ListboxModule} from 'primeng/listbox';
import {StockProductsModel} from '../../core/models/stockProductsRelated/stockProducts.model';
import {StockChangeType} from '../../core/enums/stockChangeType.enum';
import {CustomerModel} from '../../core/models/customerRelated/customer.model';
import {CustomerType} from '../../core/enums/customerType.enum';
import {CustomerService} from '../../core/services/api/customer.service';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {CaseService} from '../../core/services/api/case.service';
import {CaseType} from '../../core/enums/caseType.enum';
import {CaseStatus} from '../../core/enums/caseStatus.enum';
import {CurrentUserService} from '../../core/services/currentUserService/currentUser.service';
import {CurrentStoreService} from '../../core/services/currentStoreService/currentStore.service';
import {CaseContentService} from '../../core/services/api/caseContent.service';
import {Router} from '@angular/router';
import {DividerModule} from 'primeng/divider';

@Component({
  selector: 'app-create-case-page',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    DialogModule,
    FormsModule,
    IconFieldModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputIconModule,
    InputTextModule,
    NgIf,
    Ripple,
    SharedModule,
    TableModule,
    ToastModule,
    FloatLabelModule,
    ListboxModule,
    AutoCompleteModule,
    DividerModule
  ],
  templateUrl: './create-case-page.component.html',
  styleUrl: './create-case-page.component.css'
})
export class CreateCasePageComponent implements OnInit {


  constructor(private customerService: CustomerService, private caseService: CaseService, private currentStoreService: CurrentStoreService, private currentUserService: CurrentUserService, private caseContentService: CaseContentService, private router: Router)
  {


  }

  customerList: CustomerModel[] = [];

  selectedCustomer: CustomerModel | null = null;


  // Customer input fields
  customerName: string | undefined = undefined;
  customerMail: string | undefined = undefined;
  customerPhone: number | undefined = undefined;

  // Case input fields
  repairModel: string = '';
  repairDesc: string = '';
  repairPrice: string = '';
  repairVMI: string = '';
  repairEstimate: string = '';
  detailsPassword: string = '';
  detailsPin: string = '';
  detailsMailLogin: string = '';
  detailsPasswordLogin: string = '';
  detailsIMEI: string = '';
  detailsAlreadyPaid: string = '';



  filteredCustomers: CustomerModel[] = [];

  newCustomer: CustomerModel | undefined = undefined;

  isNewCustomer: boolean = false;

  selectedCustomerType: CustomerType | null = null; // for later use

  updateCustomerList() {


      this.customerService.getCustomers().subscribe((data: CustomerModel[]) => {
        this.customerList = data.map(customer => ({
          ...customer,
          displayLabel: `${customer.name} ${customer.contactInfo?.phoneNumber}`,
        }));
      });


  }

  ngOnInit(): void
  {
    this.updateCustomerList();



  }

  filterCustomers(event: any) {
    const query = event.query.toLowerCase();

    this.filteredCustomers = this.customerList.filter(customer => {
      return (
        customer.name.toLowerCase().includes(query) ||
        customer.contactInfo?.phoneNumber.toString().includes(query)
      );
    });
  }

  clearCustomer() {
    this.selectedCustomer = null;
    this.customerName = undefined;
    this.customerMail = undefined;
    this.customerPhone = undefined;
  }

  createCase(): void {
    // Collect input values
    const caseContentFields = [
      { fieldId: 1, content: this.repairModel },
      { fieldId: 2, content: this.repairDesc },
      { fieldId: 3, content: this.repairPrice },
      { fieldId: 4, content: this.repairVMI },
      { fieldId: 5, content: this.repairEstimate },
      { fieldId: 6, content: this.detailsPassword },
      { fieldId: 7, content: this.detailsPin },
      { fieldId: 8, content: this.detailsMailLogin },
      { fieldId: 9, content: this.detailsPasswordLogin },
      { fieldId: 10, content: this.detailsIMEI },
      { fieldId: 11, content: this.detailsAlreadyPaid },
    ];


    const caseContents = caseContentFields
      .map(field => ({
        fieldId: field.fieldId,
        content: field.content
      }));

    const createCaseAndContents = (customerId: number) => {

      this.caseService.createCase({
        caseStatus: CaseStatus.Afventer, // hardcoded for now
        creator: this.currentUserService.getCurrentUserId(),
        storeId: this.currentStoreService.currentStore?.id,
        customerId: customerId,
        caseType: CaseType.Reparation // hardcoded for now
      }).subscribe({
        next: (caseData) => {
          console.log("Case created:", caseData);


          const caseId = caseData.id;
          const caseContentsWithCaseId = caseContents.map(content => ({
            ...content,
            caseId: caseId
          }));

          caseContentsWithCaseId.forEach(content => {
            this.caseContentService.createCaseContent(content)
              .subscribe({
                error: (err) => console.error(`Error creating case content for fieldId ${content.fieldId}:`, err)
              });
          });

          this.router.navigate(['/display-case', caseId]);

        },
        error: (err) => console.error("Error creating case:", err)
      });
    };



    if (!this.selectedCustomer) {
      this.customerService.createCustomer({
        name: this.customerName,
        customerType: 1, // hardcoded for now
        mail: this.customerMail,
        phoneNumber: this.customerPhone
      }).subscribe({
        next: (data: CustomerModel) => {
          this.newCustomer = data;
          this.isNewCustomer = true;
          console.log("New customer created:", data);

          createCaseAndContents(data.id);
        },
        error: (err) => console.error("Error creating customer:", err)
      });
    } else {

      createCaseAndContents(this.selectedCustomer.id);
    }



  }



  onCustomerSelectionChange($event: any): void
  {
    if (this.selectedCustomer?.contactInfo) {

      this.customerName = this.selectedCustomer.name;
      this.customerMail = this.selectedCustomer.contactInfo.mail;
      this.customerPhone = this.selectedCustomer.contactInfo.phoneNumber;
    } else {

      this.customerName = undefined;
      this.customerMail = undefined;
      this.customerPhone = undefined;
    }



  }


}
