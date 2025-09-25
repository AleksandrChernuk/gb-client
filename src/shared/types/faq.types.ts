export interface IFaq {
  id: number;
  title: string;
  slug: string;
  questions: {
    id: number;
    title: string;
    text: string[];
  };
}

export interface IFaqSearchValue {
  qwery: string;
}
