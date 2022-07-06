export interface IForm {
  [section: `section${number}`]: ISection; // section1, section2, section3, etc.
}

// export interface ISectionNew {
//   settings: ISectionSettings;
//   [row: string]: ISectionData; // row1, row2, row3, etc.
// }

// type ISection = { settings: ISectionSettings; } & { [row: `row${number}`]: ISectionData; }

export interface ISection {
  // [settings: `settings`]: ISectionSettings;
  settings: ISectionSettings;
  [row: `row${number}`]: ISectionData;
}

// type Props = {
//   [key: `on${string}`]: (...a: any[]) => any; 
//   [key: `flag${string}`]: boolean;
// }

export interface ISectionSettings {
  id: number;
  title: string;
}

export interface ISectionData {
  [column: string]: IItem;
}

export interface IItem {
  name: string;
  type: DraggedElementType,
  value: FormItems.TextInput | FormItems.NumberInput |  FormItems.IDateTimeInput | FormItems.ISelectInput[] | FormItems.MultimediaInput;
  settings: IItemSettings;
}

export enum DraggedElementType {
  none,
  text,
  number,
  dateTime,
  multiSelect,
  singleSelect,
  multimedia,
  section
}

export namespace FormItems {
  export type TextInput = string;
  export type NumberInput = number;
  export type MultimediaInput = File;

  export interface IDateTimeInput {
    date: string;
    time: string;
  }

  export interface ISelectInput {
    value: string;
    checked: boolean;
  }
}

export interface IItemSettings {
  required: boolean;
}