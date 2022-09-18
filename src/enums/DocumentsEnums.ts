export enum DocumentTypes {
  WEALTH_DECLARATION = 1,
  INTERESTS_DECLARATIONS = 2,
}

export const DocumentTypeLabels: any = {
  [DocumentTypes.WEALTH_DECLARATION]: "Declaratie de avere",
  [DocumentTypes.INTERESTS_DECLARATIONS]: "Declaratie de interese",
};

export enum DocumentStatuses {
  WAITING_OCR,
  OCR_COMPLETED,
  OCR_ERROR,
  OCR_OUTPUT_NOT_FOUND,
  OCR_OUTPUT_DOWNLOAD_ERROR,
  VALIDATED,
  DOWNLOAD_ERROR,
}

export const ValidDocumentStatuses = [
  DocumentStatuses.OCR_COMPLETED,
  DocumentStatuses.VALIDATED,
];
