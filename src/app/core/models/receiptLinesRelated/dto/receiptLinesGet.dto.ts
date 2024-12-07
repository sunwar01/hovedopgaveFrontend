export interface ReceiptLinesGetDto {
  id: number;
  receiptId: number;
  productId: number;
  productText: string;
  quantity: number;
  price: number;
}
