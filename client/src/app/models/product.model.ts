export interface Product {
  id: number
  name: string
  description: string
  composition: string
  origin: string
  height: number
  width: number
  depth: number
  productOptions: ProductOption[]
}

export interface ProductOption {
  id: number
  date: string
  price: number
  available: number
  quantity: number
  colorId: number
  colorName: string
  previewImgUrl: string
  images?: {
    id: number
    imgUrl: string
  }[]
}
