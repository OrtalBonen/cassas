export interface newRootProductsReq {
    name: string
    description: string | null
    composition: string | null
    origin: string | null
    height: number | null
    width: number | null
    depth: number | null
    collectionId: number | null
}

export interface newProductReq {
    price: number
    available: boolean
    quantity: number
    rootProductId: number
    colorId: number | null
    previewImgUrl: string
    images: string[]
}

export interface createProductReq {
    newRootProductsReq: newRootProductsReq
    categoriesIds: number[]
    products: newProductReq[]
}

export interface getProductsParams {
    departmentId: number | undefined,
    categoryId: number | undefined,
    searchWord: string | undefined,
    newCollection: boolean,
    offset: number,
    rowCount: number
}

export enum orderType {
    ordered = 1,
    cart = 2
}


