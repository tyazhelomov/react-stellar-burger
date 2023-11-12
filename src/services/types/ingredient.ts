export interface IIngredientInfo {
  readonly calories: number;
  readonly carbohydrates: number;
  readonly fat: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly name: string;
  readonly price: number;
  readonly proteins: number;
  readonly type: string;
  readonly __v: number;
  readonly _id: string;
  uuid?: string;
}

export type TIngredientLoading = { isLoading: boolean; };
export type TIngredientElement = { element: IIngredientInfo | undefined };

export type TIngredient = TIngredientElement & TIngredientLoading;

export interface IIngredients {
  [type: string]: Array<IIngredientInfo>;
}