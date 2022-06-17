import { FC } from 'react'
import Container from '@/components/Container'
import { Table, Button } from 'antd'
import Head from 'next/head'
import Link from 'next/link'

const Product: FC = () => {

    const dataSource = [
        {
            key: '1',
            name: 'name',
            amount: 'Mike',
            category: 32,
            company: '10 Downing Street',
        },
        {
            key: '2',
            name: 'name',
            amount: 'Mike',
            category: 32,
            company: '10 Downing Street',
        }
    ]

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
            key: 'company',
        },
    ]

    return <>
        <Head>
            <title>Products</title>
        </Head>
        <Container header={{ title: 'Products', subtitle: 'Manage Products' }}>
            <Link href={'/product/add'} passHref={true}>
                <Button type='dashed' style={{ marginBlockEnd: '1rem' }}>Add New Product</Button>
            </Link>
            <Table dataSource={dataSource} columns={columns} pagination={false} />
        </Container>
    </>
}

export default Product