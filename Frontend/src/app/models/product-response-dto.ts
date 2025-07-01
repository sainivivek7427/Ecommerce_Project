export interface ProductResponseDto {
    id: string;
  name: string;
  description?: string;
  price: number;
  discountPercent?: number;
  discountPrice?: number;
  brand?: string;
  stockQuantity?: number;
  imageName?: string;
  image?: any;
  categoryName: string;
  isActive?: boolean;
  createdDate?: number;
  updatedDate?: number;
}
