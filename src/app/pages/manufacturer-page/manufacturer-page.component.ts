import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastService} from '../../core/services/toastService/toast.service';
import {ManufacturerModel} from '../../core/models/manufacturerRelated/manufacturer.model';
import {ManufacturerPostDto} from '../../core/models/manufacturerRelated/dto/manufacturerPost.dto';
import {ManufacturerService} from '../../core/services/api/manufacturer.service';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {DialogModule} from 'primeng/dialog';
import {IconFieldModule} from 'primeng/iconfield';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputIconModule} from 'primeng/inputicon';
import {InputTextModule} from 'primeng/inputtext';
import {NgIf} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ripple} from 'primeng/ripple';
import {SharedModule} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';


@Component({
  selector: 'app-manufacturer-page',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    DialogModule,
    IconFieldModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputIconModule,
    InputTextModule,
    NgIf,
    ReactiveFormsModule,
    Ripple,
    SharedModule,
    TableModule,
    ToastModule,
    FormsModule
  ],
  templateUrl: './manufacturer-page.component.html',
  styleUrl: './manufacturer-page.component.css'
})
export class ManufacturerPageComponent implements OnInit {

  availableManufacturers: ManufacturerModel[] = [];

  createManufacturerDialog: boolean = false;
  editManufacturerDialog: boolean = false;
  deleteManufacturerDialog: boolean = false;

  selectedManufacturer: ManufacturerModel | null = null;

  inputNavn: string = '';
  inputHjemmeside: string = '';



  constructor(private router: Router, private manufacturerService: ManufacturerService, private toastService: ToastService)
  {
  }


  ngOnInit(): void
  {
;


    this.updateManufacturerList();

  }

  updateManufacturerList()
  {
    this.manufacturerService.GetManufacturers().subscribe((data: ManufacturerModel[]) =>
    {
      this.availableManufacturers = data;
    });
  }

  clearInput()
  {
    this.inputNavn = '';
    this.inputHjemmeside = '';
  }

  hideCreateManufacturerDialog() {
    this.createManufacturerDialog = false;
  }

  hideEditManufacturerDialog() {
    this.editManufacturerDialog = false;
    this.selectedManufacturer = null;
  }

  hideDeleteManufacturerDialog() {
    this.deleteManufacturerDialog = false;

  }

  newManufacturerClicked()
  {
    this.createManufacturerDialog = true;
  }


  editManufacturerClicked(manufacturer: ManufacturerModel) {

    this.selectedManufacturer = { ...manufacturer };
    this.editManufacturerDialog = true;
  }

  deleteManufacturerClicked(manufacturer: ManufacturerModel) {
    this.selectedManufacturer = { ...manufacturer };
    this.deleteManufacturerDialog = true;
  }


  createNewManufacturer()
  {

    const manufacturer: ManufacturerPostDto = {
      name: this.inputNavn,
      website: this.inputHjemmeside
    };

    this.manufacturerService.CreateManufacturer(manufacturer).subscribe({
      next: (data: any) => {

      },
      error: (error: any) => {
        this.toastService.showError(error);
        console.log(error);
      },
      complete: () => {
        this.createManufacturerDialog = false;
        this.toastService.showSuccess("Manufacturer created successfully");
        this.clearInput();
        this.updateManufacturerList();
      }
    });

  }

  deleteManufacturer()
  {
    if (this.selectedManufacturer)
    {
      this.manufacturerService.SoftDeleteManufacturer(this.selectedManufacturer.id).subscribe({
        next: (data: string) => {

        },
        error: (error: any) => {
          console.log(error);
          this.toastService.showError(error);
        },
        complete: () => {
          this.deleteManufacturerDialog = false;
          this.toastService.showSuccess("Manufacturer deleted successfully");
          this.selectedManufacturer = null;
          this.updateManufacturerList();

        }
      });
    }
  }

  saveManufacturer()
  {
    if (this.selectedManufacturer)
    {
      this.manufacturerService.UpdateManufacturer(this.selectedManufacturer).subscribe({
        next: (data: any) => {

        },
        error: (error: any) => {
          console.log(error);
          this.toastService.showError(error);
        },
        complete: () => {
          this.editManufacturerDialog = false;
          this.toastService.showSuccess("Manufacturer updated successfully");
          this.selectedManufacturer = null;
          this.updateManufacturerList();

        }
      });
    }
  }




}
