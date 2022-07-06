export interface IForm {
  ID: string; // firebase id
  TemplateID: number; // mysql form template id
  [section: `Section${number}`]: ISection; // Section0, Section1, Section2, etc.
}

export interface ISection {
  Settings: ISectionSettings;
  [Row: `Row${number}`]: ISectionData; // Row0, Row1, Row2, etc.
}

export interface ISectionSettings {
  ID: number;
  Title: string;
}

export interface ISectionData {
  [Column: string]: IItem;
}

export interface IItem {
  Name: string;
  Type: DraggedElementType,
  Value: FormItems.TextInput | FormItems.NumberInput |  FormItems.IDateTimeInput | FormItems.ISelectInput[] | FormItems.MultimediaInput;
  Settings: IItemSettings;
}

export enum DraggedElementType {
  None,
  Text,
  Number,
  DateTime,
  MultiSelect,
  SingleSelect,
  Multimedia,
  Section
}

export namespace FormItems {
  export type TextInput = string;
  export type NumberInput = number;
  export type MultimediaInput = File;

  export interface IDateTimeInput {
    Date: string;
    Time: string;
  }

  export interface ISelectInput {
    Value: string;
    Checked: boolean;
  }
}

export interface IItemSettings {
  Required: boolean;
}