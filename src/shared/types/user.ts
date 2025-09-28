export interface ICurrentUser {
  id: string;
  userName: string;
  email: string;
  picture?: string;
  twoFA: boolean;
  method: string;
}
