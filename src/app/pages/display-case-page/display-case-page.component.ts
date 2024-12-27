import {Component, OnInit} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {FormsModule} from '@angular/forms';
import {IconFieldModule} from 'primeng/iconfield';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {DatePipe, NgForOf, NgIf, NgSwitchCase} from '@angular/common';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {SharedModule} from 'primeng/api';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CaseModel} from '../../core/models/caseRelated/case.model';
import {CaseService} from '../../core/services/api/case.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {FloatLabelModule} from 'primeng/floatlabel';
import {CaseContentService} from '../../core/services/api/caseContent.service';
import {CustomerService} from '../../core/services/api/customer.service';
import {DialogModule} from 'primeng/dialog';
import {Ripple} from 'primeng/ripple';
import {Select} from 'primeng/select';
import {ProductModel} from '../../core/models/productRelated/product.model';
import {CustomerModel} from '../../core/models/customerRelated/customer.model';
import {ToastService} from '../../core/services/toastService/toast.service';
import {CustomerUpdateDto} from '../../core/models/customerRelated/dto/customerUpdate.dto';
import {TextareaModule} from 'primeng/textarea';
import {CaseNotesService} from '../../core/services/api/caseNotes.service';
import {CurrentUserService} from '../../core/services/currentUserService/currentUser.service';
import {CaseNotesModel} from '../../core/models/caseNotesRelated/caseNotes.model';
import {StockProductsModel} from '../../core/models/stockProductsRelated/stockProducts.model';
import {StockProductsService} from '../../core/services/api/stockProducts.service';
import {ListboxModule} from 'primeng/listbox';
import {CaseProductService} from '../../core/services/api/caseProduct.service';
import {CurrentStoreService} from '../../core/services/currentStoreService/currentStore.service';
import {DividerModule} from 'primeng/divider';
import {CaseStatus} from '../../core/enums/caseStatus.enum';
import {CaseUpdateDto} from '../../core/models/caseRelated/dto/caseUpdate.dto';
import {CaseContentModel} from '../../core/models/caseContentRelated/caseContent.model';
import {CaseContentUpdateDto} from '../../core/models/caseContentRelated/dto/caseContentUpdateDto';

@Component({
  selector: 'app-display-case-page',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    FormsModule,
    IconFieldModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputIconModule,
    InputTextModule,
    NgForOf,
    NgIf,
    NgSwitchCase,
    ProgressSpinnerModule,
    SharedModule,
    Tab,
    TabList,
    TableModule,
    Tabs,
    ToastModule,
    TabPanels,
    TabPanel,
    AutoCompleteModule,
    FloatLabelModule,
    DialogModule,
    Ripple,
    Select,
    TextareaModule,
    DatePipe,
    ListboxModule,
    DividerModule
  ],
  templateUrl: './display-case-page.component.html',
  styleUrl: './display-case-page.component.css'
})
export class DisplayCasePageComponent implements OnInit {



  currentCase: CaseModel | undefined = undefined;
  currentCustomer: CustomerModel | undefined = undefined;
  caseNotes: CaseNotesModel[] = [];
  availableStockProducts: StockProductsModel[] = [];
  selectedStockProduct: StockProductsModel | null = null;
  totalCasePrice: number = 0;
  caseStatuses: { label: string, value: CaseStatus }[] = [];
  currentCaseStatus: CaseStatus | undefined = undefined;

  editCustomerDialog: boolean = false;
  editCaseContentInformation: boolean = false;
  editCaseContentDetails: boolean = false;

  // Customer input fields
  customerName: string | undefined = undefined;
  customerMail: string | undefined = undefined;
  customerPhone: number | undefined = undefined;

  // Case input fields
  repairModel: { content: string; id: number; caseId : number; fieldId : number }
    = { content: '', id: 0, caseId : 0, fieldId : 0 };

  repairDesc: { content: string; id: number; caseId : number; fieldId : number   }
    = { content: '', id: 0, caseId : 0, fieldId : 0   };

  repairPrice: { content: string; id: number; caseId : number; fieldId : number  }
    = { content: '', id: 0, caseId : 0, fieldId : 0  };

  repairVMI: { content: string; id: number; caseId : number; fieldId : number }
    = { content: '', id: 0, caseId : 0, fieldId : 0  };

  repairEstimate: { content: string; id: number; caseId : number; fieldId : number  }
    = { content: '', id: 0, caseId : 0, fieldId : 0  };

  detailsPassword: { content: string; id: number; caseId : number; fieldId : number  }
    = { content: '', id: 0, caseId : 0, fieldId : 0  };

  detailsPin: { content: string; id: number; caseId : number; fieldId : number  }
    = { content: '', id: 0, caseId : 0, fieldId : 0  };

  detailsMailLogin: { content: string; id: number; caseId : number; fieldId : number  }
    = { content: '', id: 0, caseId : 0, fieldId : 0  };

  detailsPasswordLogin: { content: string; id: number; caseId : number; fieldId : number  }
    = { content: '', id: 0, caseId : 0, fieldId : 0  };

  detailsIMEI: { content: string; id: number; caseId : number; fieldId : number  }
    = { content: '', id: 0, caseId : 0, fieldId : 0  };

  detailsAlreadyPaid: { content: string; id: number; caseId : number; fieldId : number  }
    = { content: '', id: 0, caseId : 0, fieldId : 0  };


  caseNoteTextArea: string = '';

  constructor(private caseService: CaseService, private router: Router, private route: ActivatedRoute,
              private caseContentService: CaseContentService, private customerService: CustomerService,
              private toastService: ToastService, private caseNoteService: CaseNotesService,
              private currentUserService: CurrentUserService, private stockProductsService: StockProductsService,
              private caseProductService: CaseProductService, private currentStoreService: CurrentStoreService) {
  }

  calculateTotalPrice() {

    this.totalCasePrice = 0;

    this.currentCase?.caseProducts.forEach((caseProduct) => {
      this.totalCasePrice += caseProduct.product.price * caseProduct.quantity;
    });
  }

  populateCaseStatuses() {
    this.caseStatuses = Object.keys(CaseStatus)
      .filter(key => isNaN(Number(key)))
      .map((key) => ({
        label: this.getEnumName(CaseStatus[key as keyof typeof CaseStatus]),
        value: CaseStatus[key as keyof typeof CaseStatus]

      }));

  }

  saveCustomer(): void {
    if (this.currentCustomer) {

      const customerUpdateDto: CustomerUpdateDto = {
        name: this.currentCustomer.name,
        mail: this.currentCustomer.contactInfo.mail,
        phoneNumber: this.currentCustomer.contactInfo.phoneNumber
      };


      this.customerService.updateCustomer(this.currentCustomer, customerUpdateDto).subscribe({
        next: (data: any) => {

        },
        error: (error: any) => {
          console.log(error);
          this.toastService.showError(error);
        },
        complete: () => {
          this.editCustomerDialog = false;
          this.updateCase();
          this.toastService.showSuccess("Customer updated successfully");
        }
      });
    }
  }

  saveCaseContentInformation(): void {

    const caseContentInformationFields = [
      this.repairModel,
      this.repairDesc,
      this.repairPrice,
      this.repairVMI,
      this.repairEstimate
    ];

    caseContentInformationFields.forEach((caseContent) => {

      let caseContentUpdateDto : CaseContentUpdateDto = {
        id: caseContent.id,
        caseId: caseContent.caseId,
        fieldId: caseContent.fieldId,
        content: caseContent.content
      }

        this.caseContentService.updateCaseContent(caseContentUpdateDto).subscribe({
          next: (data) => {
            console.log("Case content updated:", data);
          },

          error: (err) => console.error("Error updating case content:", err)


        });

      });

    this.editCaseContentInformation = false;
    this.updateCase();


  }

  saveCaseContentDetails(): void {

    const caseContentDetailFields = [
      this.detailsPassword,
      this.detailsPin,
      this.detailsMailLogin,
      this.detailsPasswordLogin,
      this.detailsIMEI,
      this.detailsAlreadyPaid

    ];

    caseContentDetailFields.forEach((caseContent) => {

      let caseContentUpdateDto : CaseContentUpdateDto = {
        id: caseContent.id,
        caseId: caseContent.caseId,
        fieldId: caseContent.fieldId,
        content: caseContent.content
      }

        this.caseContentService.updateCaseContent(caseContentUpdateDto).subscribe({
          next: (data) => {
            console.log("Case content updated:", data);
          },
          error: (err) => console.error("Error updating case content:", err)
        });
      });

    this.editCaseContentDetails = false;
    this.updateCase();
  }





  saveCaseStatus(): void {

    if (this.currentCase && this.currentCaseStatus !== undefined) {


      const caseUpdateDto: CaseUpdateDto = {
        status: this.currentCaseStatus
      };


        this.currentCase.status = this.currentCaseStatus;

        this.caseService.updateCase(this.currentCase, caseUpdateDto).subscribe({
          next: (data: any) => {

          },
          error: (error: any) => {
            console.log(error);
            this.toastService.showError(error);
          },
          complete: () => {
            this.updateCase();

          }
        });
      }

  }

  getEnumName(value: number): string {
    return CaseStatus[value];
  }

  goToCounterPage(): void {
    if (this.currentCase) {
      const caseProducts = JSON.stringify(this.currentCase.caseProducts);

      this.router.navigate(['/counter'], {
        queryParams: { caseId: this.currentCase.id, caseProducts }
      });
    }
  }

  onStatusChange(event : any): void {

    this.saveCaseStatus();
  }

  removeCaseProduct(caseProductId: number): void {

    this.caseProductService.removeCaseProduct(caseProductId).subscribe({
      next: (data) => {
        this.updateCase();
        this.toastService.showSuccess("Product removed from case successfully");
      },
      error: (error) => {
        console.error(error);
        this.toastService.showError(error);
      }
    });

  }

  addToCaseProducts(): void {

    console.log(" id" + this.selectedStockProduct?.productId)


    this.route.paramMap.subscribe(params => {
      const caseId = params.get('caseId');
      if (caseId) {
        this.caseProductService.createCaseProduct({
          caseId: Number(caseId),
          productId: this.selectedStockProduct?.productId,
          quantity: 1
        }).subscribe({
          next: (data) => {
            this.updateCase();
            this.toastService.showSuccess("Product added to case successfully");
          },
          error: (error) => {
            console.error(error);
            this.toastService.showError(error);
          }
        });
      } else {
        console.error("Case ID is null or undefined.");
      }
    });






    this.selectedStockProduct = null;
  }

  updateStockProductList() {
    this.stockProductsService.GetStockProductsByStockId(<number>this.currentStoreService.currentStore?.id).subscribe((data: StockProductsModel[]) => {
      this.availableStockProducts = data;
    });
  }

  clearNoteTextArea() {
    this.caseNoteTextArea = '';
    console.log(this.caseNotes);
    console.log(this.availableStockProducts);
  }

  addCaseNoteClicked() {


    this.route.paramMap.subscribe(params => {
      const caseId = params.get('caseId');
      if (caseId) {
        this.caseNoteService.createCaseNotes({
          text: this.caseNoteTextArea,
          caseId: Number(caseId),
          userId: this.currentUserService.getCurrentUserId(),
          dateAdded: new Date()
        }).subscribe({
          next: (data) => {
            this.clearNoteTextArea();
            this.updateCase();
            this.toastService.showSuccess("Case note added successfully");
          },
          error: (error) => {
            console.error(error);
            this.toastService.showError(error);
          }
        });
      } else {
        console.error("Case ID is null or undefined.");
      }
    });

  }




  editCustomerClicked() {
    this.editCustomerDialog = true;
  }

  editCaseContentInformationClicked() {
    this.editCaseContentInformation = true;
  }

  editCaseContentDetailsClicked() {
    this.editCaseContentDetails = true;
  }


  updateCase(): void {
    this.route.paramMap.subscribe(params => {
      const caseId = params.get('caseId');
      if (caseId) {
        this.caseService.getCase(Number(caseId)).subscribe({
          next: (caseData) => {
            this.currentCase = caseData;
            this.caseNotes = this.currentCase?.caseNotes || [];

            this.calculateTotalPrice();


            this.currentCustomer = this.currentCase?.customer;
            this.currentCaseStatus = this.currentCase?.status;

            this.customerName = this.currentCustomer?.name;
            this.customerMail =  this.currentCustomer?.contactInfo.mail;
            this.customerPhone = this.currentCustomer?.contactInfo.phoneNumber;



            this.currentCase?.caseContent.forEach((CaseContent) => {
              switch (CaseContent.fieldId) {
                case 1:
                  this.repairModel.content = CaseContent.content;
                  this.repairModel.id = CaseContent.id;
                  this.repairModel.caseId = CaseContent.caseId;
                  this.repairModel.fieldId = CaseContent.fieldId;
                  break;
                case 2:
                  this.repairDesc.content = CaseContent.content;
                  this.repairDesc.id = CaseContent.id;
                  this.repairDesc.caseId = CaseContent.caseId;
                  this.repairDesc.fieldId = CaseContent.fieldId;
                  break;
                case 3:
                  this.repairPrice.content = CaseContent.content;
                  this.repairPrice.id = CaseContent.id;
                  this.repairPrice.caseId = CaseContent.caseId;
                  this.repairPrice.fieldId = CaseContent.fieldId;
                  break;
                case 4:
                  this.repairVMI.content = CaseContent.content;
                  this.repairVMI.id = CaseContent.id;
                  this.repairVMI.caseId = CaseContent.caseId;
                  this.repairVMI.fieldId = CaseContent.fieldId;
                  break;
                case 5:
                  this.repairEstimate.content = CaseContent.content;
                  this.repairEstimate.id = CaseContent.id;
                  this.repairEstimate.caseId = CaseContent.caseId;
                  this.repairEstimate.fieldId = CaseContent.fieldId;
                  break;
                case 6:
                  this.detailsPassword.content = CaseContent.content;
                  this.detailsPassword.id = CaseContent.id;
                  this.detailsPassword.caseId = CaseContent.caseId;
                  this.detailsPassword.fieldId = CaseContent.fieldId;
                  break;
                case 7:
                  this.detailsPin.content = CaseContent.content;
                  this.detailsPin.id = CaseContent.id;
                  this.detailsPin.caseId = CaseContent.caseId;
                  this.detailsPin.fieldId = CaseContent.fieldId;
                  break;
                case 8:
                  this.detailsMailLogin.content = CaseContent.content;
                  this.detailsMailLogin.id = CaseContent.id;
                  this.detailsMailLogin.caseId = CaseContent.caseId;
                  this.detailsMailLogin.fieldId = CaseContent.fieldId;
                  break;
                case 9:
                  this.detailsPasswordLogin.content = CaseContent.content;
                  this.detailsPasswordLogin.id = CaseContent.id;
                  this.detailsPasswordLogin.caseId = CaseContent.caseId;
                  this.detailsPasswordLogin.fieldId = CaseContent.fieldId;
                  break;
                case 10:
                  this.detailsIMEI.content = CaseContent.content;
                  this.detailsIMEI.id = CaseContent.id;
                  this.detailsIMEI.caseId = CaseContent.caseId;
                  this.detailsIMEI.fieldId = CaseContent.fieldId;
                  break;
                case 11:
                  this.detailsAlreadyPaid.content = CaseContent.content;
                  this.detailsAlreadyPaid.id = CaseContent.id;
                  this.detailsAlreadyPaid.caseId = CaseContent.caseId;
                  this.detailsAlreadyPaid.fieldId = CaseContent.fieldId;
                  break;
                default:
                  console.error("Unknown fieldId:", CaseContent.fieldId);
                  break;
              }
            });


          },
          error: (err) => console.error("Error fetching case:", err)
        });
      } else {
        console.error("Case ID is null or undefined.");
      }
    });
  }



  hideEditCustomerDialog() {
    this.editCustomerDialog = false;
  }

  hideEditCaseContentInformationDialog() {
    this.editCaseContentInformation = false;
  }

  hideEditCaseContentDetailsDialog() {
    this.editCaseContentDetails = false;
  }




  ngOnInit(): void {
    this.updateCase();
    this.updateStockProductList();
    this.populateCaseStatuses();


  }
}
