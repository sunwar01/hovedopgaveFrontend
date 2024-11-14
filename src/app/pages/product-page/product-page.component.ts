import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastService} from '../../core/services/toastService/toast.service';
import {ProductService} from '../../core/services/api/product.service';
import {ProductModel} from '../../core/models/productRelated/product.model';
import {ProductPostDto} from '../../core/models/productRelated/dto/productPost.dto';
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
import {ManufacturerService} from '../../core/services/api/manufacturer.service';
import {SupplierService} from '../../core/services/api/supplier.service';
import {CategoryService} from '../../core/services/api/category.service';
import {FloatLabelModule} from 'primeng/floatlabel';
import {Select} from 'primeng/select';
import {CategoryModel} from '../../core/models/categoryRelated/category.model';
import {ManufacturerModel} from '../../core/models/manufacturerRelated/manufacturer.model';
import {SupplierPageComponent} from '../supplier-page/supplier-page.component';
import {SupplierModel} from '../../core/models/supplierRelated/supplier.model';

@Component({
  selector: 'app-product-page',
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
    FormsModule,
    FloatLabelModule,
    Select
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit
{


  availableProducts: ProductModel[] = [];

  availableCategories: CategoryModel[] = [];
  availableManufacturers: ManufacturerModel[] = [];
  availableSuppliers: SupplierModel[] = [];


  createProductDialog: boolean = false;
  editProductDialog: boolean = false;
  deleteProductDialog: boolean = false;

  selectedProduct: ProductModel | null = null;
  selectedCategory: CategoryModel | null = null;
  selectedManufacturer: ManufacturerModel | null = null;
  selectedSupplier: SupplierModel | null = null;

  inputNavn: string = '';
  inputPris: number = 0;
  inputNettoPris: number = 0;
  inputLeverandoerProduktId: number = 0;



  constructor(private router: Router,
              private productService: ProductService,
              private manufacturerService: ManufacturerService,
              private supplierService: SupplierService,
              private categoryService: CategoryService,
              private toastService: ToastService) {




  }




  ngOnInit(): void
  {

    this.updateProductList();
    this.updateCategoryList();
    this.updateManufacturerList();
    this.updateSupplierList();



  }



  updateProductList()
  {
    this.productService.GetProducts().subscribe((data: ProductModel[]) =>
    {
      this.availableProducts = data;
    });
  }

  updateCategoryList()
  {
    this.categoryService.GetCategories().subscribe((data: CategoryModel[]) =>
    {
      this.availableCategories = data;
    });
  }

  updateManufacturerList()
  {
    this.manufacturerService.GetManufacturers().subscribe((data: ManufacturerModel[]) =>
    {
      this.availableManufacturers = data;
    });
  }

  updateSupplierList()
  {
    this.supplierService.GetSuppliers().subscribe((data: SupplierModel[]) =>
    {
      this.availableSuppliers = data;
    });
  }


  clearInput()
  {
    this.inputNavn = '';
    this.inputPris = 0;
    this.inputNettoPris = 0;
    this.selectedManufacturer = null;
    this.selectedCategory = null;
    this.selectedSupplier = null;
    this.inputLeverandoerProduktId = 0;

  }

  hideCreateProductDialog() {
    this.createProductDialog = false;
    this.clearInput();
  }

  hideEditProductDialog() {
    this.editProductDialog = false;
    this.selectedProduct = null;
    this.clearInput();
  }

  hideDeleteProductDialog() {
    this.deleteProductDialog = false;
    this.clearInput();

  }

  newProductClicked()
  {
    this.createProductDialog = true;
  }



  editProductClicked(product: ProductModel) {
    this.selectedProduct = { ...product };
   // this.selectedManufacturer = this.getCategoryByCategoryId(subCategory.categoryId);
    this.editProductDialog = true;
  }

  deleteProductClicked(product: ProductModel) {
    this.selectedProduct = { ...product };
    this.deleteProductDialog = true;
  }


  createNewProduct()
  {

    const product: ProductPostDto = {
      name: this.inputNavn,
      price: this.inputPris,
      netPrice: this.inputNettoPris,
      categoryId: this.selectedCategory ? this.selectedCategory.id : 0,
      manufacturerId: this.selectedManufacturer ? this.selectedManufacturer.id : 0,
      supplierId: this.selectedSupplier ? this.selectedSupplier.id : 0,
      supplierProductId: this.inputLeverandoerProduktId
    };

    this.productService.CreateProduct(product).subscribe({
      next: (data: any) => {

      },
      error: (error: any) => {
        this.toastService.showError(error);
        console.log(error);
      },
      complete: () => {
        this.createProductDialog = false;
        this.toastService.showSuccess("Product created successfully");
        this.clearInput();
        this.updateProductList();
      }
    });

  }

  deleteProduct()
  {
    if (this.selectedProduct)
    {
      this.productService.SoftDeleteProduct(this.selectedProduct.id).subscribe({
        next: (data: string) => {

        },
        error: (error: any) => {
          console.log(error);
          this.toastService.showError(error);
        },
        complete: () => {
          this.deleteProductDialog = false;
          this.toastService.showSuccess("Product deleted successfully");
          this.selectedProduct = null;
          this.updateProductList();

        }
      });
    }
  }

  saveProduct()
  {
    if (this.selectedProduct)
    {
      this.productService.UpdateProduct(this.selectedProduct).subscribe({
        next: (data: any) => {

        },
        error: (error: any) => {
          console.log(error);
          this.toastService.showError(error);
        },
        complete: () => {
          this.editProductDialog = false;
          this.toastService.showSuccess("Product updated successfully");
          this.selectedProduct = null;
          this.updateProductList();
          this.clearInput();

        }
      });
    }
  }
}

