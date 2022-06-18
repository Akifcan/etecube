import { CompanyProps } from "./company"

export interface ProductProps {
    key?: number
    id: number
    name: string,
    amount: number,
    category: string,
    company: CompanyProps
}

