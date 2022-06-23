import { FC, useState, useEffect } from 'react'
import Container from '@/components/Container'
import { Table, Button, Pagination, Input, Row, Select, Col, Popconfirm, Spin, message } from 'antd'
import Head from 'next/head'
import Link from 'next/link'
import http from '@/helpers/http'
import { ProductProps } from '@/interfaces/product'
import { CompanyProps } from '@/interfaces/company'
const { Search } = Input
const { Option } = Select


const Product: FC = () => {

    const [isLoading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState('')
    const [totalPage, setTotalPage] = useState<number>()
    const [order, setOrder] = useState('ASC')


    const [products, setProducts] = useState<ProductProps[]>([])

    const onDelete = async (id: number) => {
        setLoading(true)
        const response = await http<{ affected: number }>(`/product/${id}`, 'DELETE')
        if (response.data.affected > 0) {
            message.info('Deleted this product')
            loadProducts()
        } else {
            message.info('An error occured')
        }
    }

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
        {
            title: 'Actions',
            dataIndex: 'id',
            render: (id: number) => <Row>
                <Link href={`/product/${id}`} passHref={true}>
                    <Button type='primary'>Edit</Button>
                </Link>
                <Popconfirm placement="topLeft" title={"Are you sure to delete this product?"} onConfirm={() => onDelete(id)} okText="Yes" cancelText="No">
                    <Button style={{ marginLeft: '1rem', background: 'red', color: 'white' }} >Remove</Button>
                </Popconfirm>
            </Row>,
            key: 'company',
        },
    ]

    const loadProducts = async () => {

        const products = await http<{ total: number, products: ProductProps[] }>(`/product?page=${currentPage}&name=${search}&order=${order}`, 'GET')

        setProducts(products.data.products.map((product) => {
            return {
                ...product, key: product.id
            }
        }))
        setTotalPage(products.data.total * 10)
        setLoading(false)
    }

    useEffect(() => {
        loadProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, search, order])


    const onSearch = (value: string) => {
        setSearch(value)
        setCurrentPage(1)
    }


    return <>
        <Head>
            <title>Products</title>
        </Head>
        <Container header={{ title: 'Products', subtitle: 'Manage Products' }} loginRequired={true}>
            {!isLoading && (
                <>
                    <Row>
                        <Col flex={1}>
                            <Search placeholder="Search Product" allowClear onSearch={onSearch} style={{ width: '100%', marginBlockEnd: '1rem' }} />
                        </Col>
                        <Col>
                            <Select value={order} onChange={(e) => setOrder(e)}>
                                <Option value='ASC'>A-Z</Option>
                                <Option value='DESC'>Z-A</Option>
                            </Select>
                        </Col>
                    </Row>

                    <Link href={'/product/add'} passHref={true}>
                        <Button type='dashed' style={{ marginBlockEnd: '1rem' }}>Add New Product</Button>
                    </Link>
                    <Table style={{ overflow: 'auto', background: 'white' }} dataSource={products} columns={columns} pagination={false} />
                    {totalPage && (
                        <Pagination style={{ marginBlockStart: '1rem' }} onChange={(currentPage) => {
                            setCurrentPage(currentPage)
                        }} current={currentPage} total={totalPage} />
                    )}
                </>
            )}
            {isLoading && (
                <div className='center'><Spin size="large" /></div>
            )}
        </Container>
    </>
}

export default Product