export enum ModalEvents {
  AddClient = "AddClient",
  UpdateClient = "UpdateClient",
}

export interface ICommonModalEventResponse {
    status: boolean;
    data?: { [key: string]: string | number | boolean }
}