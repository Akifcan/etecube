import { FC } from 'react'
import Container from '@/components/Container'
import { Table, Button } from 'antd'
import Head from 'next/head'
import Link from 'next/link'

const Company: FC = () => {

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            legalNumber: 32,
            country: '10 Downing Street',
            website: '10 Downing Street'
        },
        {
            key: '1',
            name: 'Mike',
            legalNumber: 32,
            country: '10 Downing Street',
            website: '10 Downing Street'
        }
    ]

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Legal Number',
            dataIndex: 'legalNumber',
            key: 'legalNumber',
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: 'Website',
            dataIndex: 'website',
            key: 'website',
        },
    ]

    return <>
        <Head>
            <title>Companies</title>
        </Head>
        <Container header={{ title: 'Companies', subtitle: 'Manage Companies' }}>
            <Link href={'/company/add'} passHref={true}>
                <Button type='dashed' style={{ marginBlockEnd: '1rem' }}>Add New Company</Button>
            </Link>
            <Table dataSource={dataSource} columns={columns} pagination={false} />
        </Container>
    </>
}

export default Company