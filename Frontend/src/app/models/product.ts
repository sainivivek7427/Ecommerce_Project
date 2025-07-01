export interface Product {
  // name: string;
  // description?: string;
  // price: number;
  // discountPercent?: number;
  // brand?: string;
  // stockQuantity?: number;
  // categoryname: string;
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
  categoryId: string;
  isActive?: boolean;
  createdDate?: number;
  updatedDate?: number;
}
