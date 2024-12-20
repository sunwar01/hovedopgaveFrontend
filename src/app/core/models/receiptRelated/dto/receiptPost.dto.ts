export interface ReceiptPostDto {
  total: number;
  storeId: number | undefined;
  counterId: number | undefined;
  userId: number | null;
  caseId: number | null;
}
