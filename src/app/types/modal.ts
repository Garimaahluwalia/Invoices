export enum ModalEvents {
  AddorUpdateClient = "AddorUpdateClient",
  Delete = "Delete"
}

export interface IEventResponse {
    status: boolean;
    data?: { [key: string]: string | number | boolean }
}