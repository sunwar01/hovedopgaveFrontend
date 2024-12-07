export interface ReceiptLinesModel {
  id: number;
  receiptId: number;
  productId: number;
  productText: string;
  quantity: number;
  price: number;
}
