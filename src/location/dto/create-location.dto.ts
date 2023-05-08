export class CreateLocationDto {
  name?: string;
  zip?: string;
  number?: number;
  street?: string;
  neighbourhood?: string;
  state?: string;
  city?: string;
  companyId: string;
}
