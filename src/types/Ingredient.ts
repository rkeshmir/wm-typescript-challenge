export type Ingredient =
  | {
      unit: string;
      amount: number;
      ingredient: string;
      label?: string;
    }
  | {
      special: string;
    };
