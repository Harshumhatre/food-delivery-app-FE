import { FoodItem } from '../../Shared/models/FoodItem';
import { Restaurant } from '../../Shared/models/Restaurant';

export interface OrderDto {
  foodItemsList?: FoodItem[];
  userId?: number;
  restaurant?: Restaurant;
}
