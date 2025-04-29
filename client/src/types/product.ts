export interface ProductData {
    _id:string;
    name: string;
    description: string;
    createdDate?: Date;
    price: number;
    imageUrl?: string;
    countInStock: number;
    category: Category;
}

export type Category = {
    name: string;
    tags: string[]
}