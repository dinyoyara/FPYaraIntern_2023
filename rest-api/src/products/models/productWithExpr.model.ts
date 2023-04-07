import { ProductBaseModel } from './productBase.model';

export interface ProductWithExprMode extends ProductBaseModel {
  expr: string;
}
