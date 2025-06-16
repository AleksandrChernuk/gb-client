export interface ICurrentUser {
  id: string;
  userName: string;
  email: string;
  picture?: string;
  twoFA: boolean;
}

export interface IUserStore {
  currentUser: ICurrentUser | null;
  setUserStore: (currentUser: ICurrentUser) => void;
  clearUserStore: () => void;
}
