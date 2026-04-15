export interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    imageUrlMobile?: string;
    description: string;
}

export interface CartItem extends Product {
    quantity: number;
}