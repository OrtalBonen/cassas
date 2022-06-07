export interface Cart {
    id: number,
    cartItems: Item[]
}

export interface Item {
    id: number,
    product_id: number,
    price: number | null,
    quantity: number,
    name: string,
    height: number | null,
    width: number | null,
    depth: number | null,
    colorId: number,
    colorName: string,
    previewImgUrl: string,
    inStock: number
}