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
    public tax!: boolean;
    public label?: string;
    public readonly? : boolean;

    constructor(type: FieldType, fieldName: string, sortOrder: number, tax: boolean = false, deleteable: boolean = true, custom: boolean = true, label?: string , readonly : boolean = false) {
        this.type = type;
        this.fieldName = fieldName;
        this.hidden = false;
        this.default = false;
        this.custom = custom;
        this.delete = deleteable;
        this.tax = tax;
        this.sortOrder = sortOrder;
        this.label = label ? label : fieldName;
        this.readonly = readonly;
    }
}