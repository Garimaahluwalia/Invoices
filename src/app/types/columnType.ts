export enum COLUMNTYPE {
    TEXT = "TEXT",
    CURRENCY = "CURRENCY",
    NUMBER = "NUMBER",
    FORMULA = "FORMULA",
    DATE = "DATE"
}

export type FieldType = "TEXT" | "NUMBER"

export interface IField {
    type: FieldType;
    fieldName: string;
    hidden: boolean;
    default: boolean;
    sortOrder: number;
    custom: boolean;
}

export class Field {
    public type!: FieldType;
    public fieldName!: string;
    public hidden!: boolean;
    public default!: boolean;
    public sortOrder!: number;
    public custom!: boolean;
    public delete!: boolean;
    public tax!: boolean

    constructor(type: FieldType, fieldName: string, sortOrder: number , tax : false) {
        this.type = type;
        this.fieldName = fieldName;
        this.hidden = false;
        this.default = false;
        this.custom = true;
        this.delete = true;
        this.tax = false;
        this.sortOrder = sortOrder;
    }
}