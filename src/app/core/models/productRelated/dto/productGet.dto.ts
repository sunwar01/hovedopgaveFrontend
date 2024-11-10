export interface ProductGetDto {
  name: string;
  price: number;
  netPrice: number;
  isDeleted: boolean;
  categoryId: number;
  manufacturerId: number;
  supplierId: number;
  supplierProductId: number;
}
