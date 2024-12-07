export interface ReceiptLinesPostDto {
  receiptId: number | null;
  productId: number;
  productText: string;
  quantity: number;
  price: number;
}
