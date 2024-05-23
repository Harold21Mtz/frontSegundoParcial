export interface ProductInterface {
    id: string
    title : string ,
    price: number,
    description: string,
    category : CategoryInterface,
    images : string[],
}

export interface ProductInterfaceTwo {
  id: string,
  name : string,
  description: string,
  price: number,
  stockQuantity: number,
  categoryName : string,
  imagesUrl : string,
}

export interface CategoryInterfaceTwo {
  id: string,
  name : string ,
  image : string,
  description: string,
}

export interface CategoryInterface {
  id: string
  name : string ,
  image : string
}

export interface NewProduct {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export interface UpdateProduct {
  title: string;
  price: number;
  description: string;
  images: string[];
}

