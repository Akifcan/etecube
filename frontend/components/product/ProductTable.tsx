import http from '@/helpers/http'
import { CompanyProps } from '@/interfaces/company'
import { ProductProps } from '@/interfaces/product'
import { Button, Spin, Table } from 'antd'
import Link from 'next/link'
import { IndexPageTableProps } from 'pages'
import { FC, useState, useEffect } from 'react'

const ProductTable: FC<IndexPageTableProps> = ({ onLoaded }) => {
    const [isLoading, setLoading] = useState(true)
    const [products, setProducts] = useState<ProductProps[]>([])
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Cateegory',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Company',
            dataIndex: 'company',
            render: (company: CompanyProps) => <Button type='primary'>{company.name}</Button>,
            key: 'company',
        },
    ]

    const loadCompanies = async () => {
        setLoading(false)
        const response = await http<{ count: number, products: ProductProps[] }>(`/product?page=${1}&name=&last`, 'GET')
        setProducts(response.data.products)
        onLoaded(response.data.count)
    }

    useEffect(() => {
        loadCompanies()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return !isLoading ? <>
        <h3>Lastly added <Link passHref={true} href='/product'><a href="#">products</a></Link></h3>
        <Table style={{ overflow: 'auto' }} dataSource={products} columns={columns} pagination={false} />
    </> : <Spin size='large' />

}

export default ProductTable