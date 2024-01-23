export interface UserSchema {
  type: string;
  properties: Record<string, any>;
  required: string[];
}

export interface UserData {
  [key: string]: string | number;
}