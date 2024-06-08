export interface ProductInterface {
  id_product: string,
  name_product: string,
  description: string,
  price: number,
  stock: number,
  img: string,
  id_category: number,
  name_category: string,
}

export interface CategoryInterface {
  id_category: string,
  name: string,
  description: string,
  img: string
}

export interface NewProduct {
  name: string,
  description: string,
  price: number,
  stock: number,
  img: string,
  id_category: number
}

export interface UpdateProduct {
  name: string,
  description: string,
  price: number,
  stock: number,
  img: string,
  id_category: number
}

