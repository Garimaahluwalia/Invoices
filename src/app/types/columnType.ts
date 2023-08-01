
export enum FieldType {
    TEXT = "TEXT",
    NUMBER = "NUMBER",
    CURRENCY = "CURRENCY",
    DATE = "DATE",
}

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
    public readonly?: boolean;
    static fieldName: string;
    static sortOrder: number;
    static tax: number;
    static label: string;
    static readonly: boolean;
    static columnType: string;

    constructor(
        type: FieldType,
        fieldName: string,
        sortOrder: number,
        tax: boolean = false,
        deleteable: boolean = true,
        custom: boolean = true,
        label?: string,
        readonly: boolean = false) {
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