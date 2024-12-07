export interface ReceiptPostDto {
  total: number;
  storeId: number | undefined;
  counterId: number;
  userId: number | null;
  caseId: number | null;
}
