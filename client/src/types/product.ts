export interface ProductData {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    countInStock: number;
    category: Category;
}

type Category = {
    name: string;
    subcategory: string;
    tags: string[]
}