/* export interface IQuotationSummary {
    quotationCount: number,
    draftquotationCount: number
} */

export class IQuotationSummary  {
    quotationCount: number  = 0;
    draftquotationCount: number = 0;

    setData(quotationCount: number, draftquotationCount: number) {
        this.draftquotationCount = draftquotationCount;
        this.quotationCount = quotationCount;
    }
}