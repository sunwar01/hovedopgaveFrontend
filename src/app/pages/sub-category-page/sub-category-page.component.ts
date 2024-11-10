import {Component, OnInit} from '@angular/core';
import {CategoryModel} from '../../core/models/categoryRelated/category.model';
import {Router} from '@angular/router';
import {CategoryService} from '../../core/services/api/category.service';
import {ToastService} from '../../core/services/toastService/toast.service';
import {CategoryPostDto} from '../../core/models/categoryRelated/dto/categoryPost.dto';
import {SubCategoryModel} from '../../core/models/subCategoryRelated/subCategory.model';
import {SubCategoryService} from '../../core/services/api/subCategory.service';
import {SubCategoryGetDto} from '../../core/models/subCategoryRelated/dto/subCategoryGet.dto';
import {SubCategoryPostDto} from '../../core/models/subCategoryRelated/dto/subCategoryPost.dto';
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
import {DropdownModule} from 'primeng/dropdown';
import {Select} from 'primeng/select';

@Component({
  selector: 'app-sub-category-page',
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
    DropdownModule,
    Select
  ],
  templateUrl: './sub-category-page.component.html',
  styleUrl: './sub-category-page.component.css'
})
export class SubCategoryPageComponent implements OnInit
{


  availableSubCategories: SubCategoryModel[] = [];
  availableCategories: CategoryModel[] = [];


  createSubCategoryDialog: boolean = false;
  editSubCategoryDialog: boolean = false;
  deleteSubCategoryDialog: boolean = false;

  selectedSubCategory: SubCategoryModel | null = null;
  selectedCategory: CategoryModel | null = null;




  inputNavn: string = '';




  constructor(private router: Router, private subCategoryService: SubCategoryService, private categoryService: CategoryService, private toastService: ToastService)
  {
  }



 getCategoryByCategoryId(id: number): CategoryModel | null
  {

    if (this.availableCategories)
    {
      const category = this.availableCategories.find(x => x.id === id);
      if (category) {
        return category;
      }
    }
    return null;
  }

  getCategoryNameById(id: number): string
  {
    if (this.availableCategories)
    {
      const category = this.availableCategories.find(x => x.id === id);
      if (category)
      {
        return category.name;
      }
    }
    return '';
  }

  ngOnInit(): void
  {

    this.updateSubCategoryList();
    this.updateCategoryList();


  }




  updateCategoryList()
  {
    this.categoryService.GetCategories().subscribe((data: CategoryModel[]) =>
    {
      this.availableCategories = data;
    });
  }

  updateSubCategoryList()
  {
    this.subCategoryService.GetSubCategories().subscribe((data: SubCategoryGetDto[]) =>
    {
      this.availableSubCategories = data;
    });
  }


  clearInput()
  {
    this.inputNavn = '';
    this.selectedCategory = null;
  }

  hideCreateSubCategoryDialog() {
    this.createSubCategoryDialog = false;
    this.clearInput();
  }

  hideEditSubCategoryDialog() {
    this.editSubCategoryDialog = false;
    this.clearInput();
  }

  hideDeleteSubCategoryDialog() {
    this.deleteSubCategoryDialog = false;
    this.clearInput();

  }

  newSubCategoryClicked()
  {
    this.createSubCategoryDialog = true;
  }


  editSubCategoryClicked(subCategory: SubCategoryModel) {
    this.selectedSubCategory = { ...subCategory };
    this.selectedCategory = this.getCategoryByCategoryId(subCategory.categoryId);
    this.editSubCategoryDialog = true;

  }

  deleteSubCategoryClicked(subCategory: SubCategoryModel) {
    this.selectedSubCategory = { ...subCategory };
    this.deleteSubCategoryDialog = true;
  }


  createNewSubCategory()
  {


    if (this.selectedCategory)
    {
    const subCategory: SubCategoryPostDto = {

      name: this.inputNavn,
      categoryId: this.selectedCategory.id
    };


    this.subCategoryService.CreateSubCategory(subCategory).subscribe({
      next: (data: any) => {

      },
      error: (error: any) => {
        this.toastService.showError(error);
        console.log(error);
      },
      complete: () => {
        this.createSubCategoryDialog = false;
        this.toastService.showSuccess("Subcategory created successfully");
        this.clearInput();
        this.updateSubCategoryList();
        this.updateCategoryList();

      }
    });

    }

  }

  deleteSubCategory()
  {
    if (this.selectedSubCategory)
    {
      this.subCategoryService.SoftDeleteSubCategory(this.selectedSubCategory.id).subscribe({
        next: (data: string) => {

        },
        error: (error: any) => {
          console.log(error);
          this.toastService.showError(error);
        },
        complete: () => {
          this.deleteSubCategoryDialog = false;
          this.toastService.showSuccess("Subcategory deleted successfully");
          this.selectedSubCategory = null;
          this.updateSubCategoryList();
          this.updateCategoryList();

        }
      });
    }
  }

  saveSubCategory()
  {
    if (this.selectedSubCategory)
    {
      this.subCategoryService.UpdateSubCategory(this.selectedSubCategory).subscribe({
        next: (data: any) => {


        },
        error: (error: any) => {
          console.log(error);
          this.toastService.showError(error);
        },
        complete: () => {
          this.editSubCategoryDialog = false;
          this.toastService.showSuccess("Subcategory updated successfully");
          this.selectedSubCategory = null;
          this.updateSubCategoryList();
          this.updateCategoryList();
          this.clearInput();


        }
      });
    }
  }

}
