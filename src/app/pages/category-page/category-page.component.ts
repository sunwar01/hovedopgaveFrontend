import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';

import {ToastService} from '../../core/services/toastService/toast.service';

import {CategoryModel} from '../../core/models/categoryRelated/category.model';
import {CategoryService} from '../../core/services/api/category.service';
import {CategoryPostDto} from '../../core/models/categoryRelated/dto/categoryPost.dto';
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

@Component({
  selector: 'app-category-page',
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
    ToastModule
  ],
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.css'
})
export class CategoryPageComponent implements OnInit
{


  availableCategories: CategoryModel[] = [];


  createCategoryDialog: boolean = false;
  editCategoryDialog: boolean = false;
  deleteCategoryDialog: boolean = false;

  selectedCategory: CategoryModel | null = null;

  inputNavn: string = '';



  constructor(private router: Router, private categoryService: CategoryService, private toastService: ToastService)
  {
  }


  ngOnInit(): void
  {

    this.updateCategoryList();

  }



  updateCategoryList()
  {
    this.categoryService.GetCategories().subscribe((data: CategoryModel[]) =>
    {
      this.availableCategories = data;
    });
  }


  clearInput()
  {
    this.inputNavn = '';
  }

  hideCreateCategoryDialog() {
    this.createCategoryDialog = false;
  }

  hideEditCategoryDialog() {
    this.editCategoryDialog = false;
    this.selectedCategory = null;
  }

  hideDeleteCategoryDialog() {
    this.deleteCategoryDialog = false;

  }

  newCategoryClicked()
  {
    this.createCategoryDialog = true;
  }


  editCategoryClicked(category: CategoryModel) {
    this.selectedCategory = { ...category };
    this.editCategoryDialog = true;
  }

  deleteCategoryClicked(category: CategoryModel) {
    this.selectedCategory = { ...category };
    this.deleteCategoryDialog = true;
  }


  createNewCategory()
  {

    const category: CategoryPostDto = {
      name: this.inputNavn,
    };

    this.categoryService.CreateCategory(category).subscribe({
      next: (data: any) => {

      },
      error: (error: any) => {
        this.toastService.showError(error);
        console.log(error);
      },
      complete: () => {
        this.createCategoryDialog = false;
        this.toastService.showSuccess("Category created successfully");
        this.clearInput();
        this.updateCategoryList();
      }
    });

  }

  deleteCategory()
  {
    if (this.selectedCategory)
    {
      this.categoryService.SoftDeleteCategory(this.selectedCategory.id).subscribe({
        next: (data: string) => {

        },
        error: (error: any) => {
          console.log(error);
          this.toastService.showError(error);
        },
        complete: () => {
          this.deleteCategoryDialog = false;
          this.toastService.showSuccess("Category deleted successfully");
          this.selectedCategory = null;
          this.updateCategoryList();

        }
      });
    }
  }

  saveCategory()
  {
    if (this.selectedCategory)
    {
      this.categoryService.UpdateCategory(this.selectedCategory).subscribe({
        next: (data: any) => {

        },
        error: (error: any) => {
          console.log(error);
          this.toastService.showError(error);
        },
        complete: () => {
          this.editCategoryDialog = false;
          this.toastService.showSuccess("Category updated successfully");
          this.selectedCategory = null;
          this.updateCategoryList();

        }
      });
    }
  }




}
