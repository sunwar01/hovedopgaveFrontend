import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {CardModule} from 'primeng/card';
import {TableModule} from 'primeng/table';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {MultiSelectModule} from 'primeng/multiselect';
import {Select} from 'primeng/select';
import {TagModule} from 'primeng/tag';
import {NgClass, NgIf} from '@angular/common';
import {SupplierModel} from '../../core/models/supplierRelated/supplier.model';
import {Router} from '@angular/router';
import {CurrentUserService} from '../../core/services/currentUserService/currentUser.service';
import {SupplierService} from '../../core/services/api/supplier.service';
import {ButtonModule} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {DialogModule} from 'primeng/dialog';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputGroupModule} from 'primeng/inputgroup';
import {SupplierPostDto} from '../../core/models/supplierRelated/dto/supplierPost.dto';
import {SupplierGetDto} from '../../core/models/supplierRelated/dto/supplierGet.dto';


@Component({
  selector: 'app-supplier-page',
  standalone: true,
  imports: [
    MatCard,
    MatGridList,
    MatGridTile,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    CardModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    FormsModule,
    MultiSelectModule,
    Select,
    TagModule,
    NgClass,
    ButtonModule,
    Ripple,
    DialogModule,
    NgIf,
    InputGroupAddonModule,
    InputGroupModule
  ],
  templateUrl: './supplier-page.component.html',
  styleUrl: './supplier-page.component.css'
})
export class SupplierPageComponent implements OnInit {

  availableSuppliers: SupplierModel[] = [];

  createSupplierDialog: boolean = false;
  editSupplierDialog: boolean = false;
  deleteSupplierDialog: boolean = false;

  selectedSupplier: SupplierModel | null = null;

  inputNavn: string = '';
  inputHjemmeside: string = '';



  constructor(private router: Router, private currentUser: CurrentUserService, private supplierService: SupplierService)
  {
  }


  ngOnInit(): void
  {

    this.supplierService.GetSuppliers().subscribe((data: SupplierModel[]) =>
    {
      this.availableSuppliers = data;
      console.log(this.availableSuppliers);

    });

  }

  clearInput()
  {
    this.inputNavn = '';
    this.inputHjemmeside = '';
  }

  hideCreateSupplierDialog() {
    this.createSupplierDialog = false;
  }

  hideEditSupplierDialog() {
    this.editSupplierDialog = false;
    this.selectedSupplier = null;
  }

  hideDeleteSupplierDialog() {
    this.deleteSupplierDialog = false;

  }

  newSupplierClicked()
  {
    this.createSupplierDialog = true;
  }

  createNewSupplier()
  {

    const supplier: SupplierPostDto = {
      name: this.inputNavn,
      website: this.inputHjemmeside
    };

    console.log("supplier" + supplier);

    this.supplierService.CreateSupplier(supplier).subscribe({
      next: (data: any) => {

      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => {
        this.createSupplierDialog = false;
        this.clearInput();
        this.ngOnInit();

      }
    });

  }

  editSupplierClicked(supplier: SupplierGetDto) {
    this.selectedSupplier = { ...supplier };
    this.editSupplierDialog = true;
  }

  deleteSupplierClicked(supplier: SupplierGetDto) {
    this.selectedSupplier = { ...supplier };
    this.deleteSupplierDialog = true;
  }


  deleteSupplier()
  {
    if (this.selectedSupplier)
    {
      this.supplierService.SoftDeleteSupplier(this.selectedSupplier.id).subscribe({
        next: (data: string) => {

        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          this.deleteSupplierDialog = false;
          this.selectedSupplier = null;
          this.ngOnInit();

        }
      });
    }
  }

  saveSupplier()
  {
    if (this.selectedSupplier)
    {
      this.supplierService.UpdateSupplier(this.selectedSupplier).subscribe({
        next: (data: any) => {

        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          this.editSupplierDialog = false;
          this.selectedSupplier = null;
          this.ngOnInit();

        }
      });
    }
  }




}
