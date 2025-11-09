export type TNormalizeParams = {
  fromCityId: number;
  toCityId: number;
  locale: string;
  formData: FormData;
  user: ICurrentUser | null;
  route: IRouteResponse;
};
