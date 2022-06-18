import { FC, useState, useEffect } from 'react'
import Container from '@/components/Container'
import { Table, Button, Pagination, Input, Row, Select, Col } from 'antd'
import Head from 'next/head'
import Link from 'next/link'
import http from '@/helpers/http'
import { CompanyProps } from '@/interfaces/company'
const { Search } = Input
const { Option } = Select

const Company: FC = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState('')
    const [totalPage, setTotalPage] = useState<number>()
    const [order, setOrder] = useState('ASC')

    const [companies, setCompanies] = useState<CompanyProps[]>([])

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
        {
            title: 'Actions',
            dataIndex: 'id',
            key: 'actions',
            render: (id: number) => <Row>
                <Link href={`/company/${id}`} passHref={true}>
                    <Button type='primary'>Edit</Button>
                </Link>
                <Button style={{ marginLeft: '1rem', background: 'red', color: 'white' }} >Remove</Button>
            </Row>,
        },

    ]

    const loadCompanies = async () => {
        const companies = await http<{ total: number, companies: CompanyProps[] }>(`/company?page=${currentPage}&name=${search}&order=${order}`, 'GET')
        setCompanies(companies.data.companies.map((company) => {
            return { ...company, key: company.id }
        }))
        setTotalPage(companies.data.total * 10)
    }

    useEffect(() => {
        loadCompanies()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, search, order])

    const onSearch = (value: string) => {
        setSearch(value)
        setCurrentPage(1)
    }

    return <>
        <Head>
            <title>Companies</title>
        </Head>
        <Container header={{ title: 'Companies', subtitle: 'Manage Companies' }}>
            <Row>
                <Col flex={1}>
                    <Search placeholder="Search Company" allowClear onSearch={onSearch} style={{ width: '100%', marginBlockEnd: '1rem' }} />
                </Col>
                <Col>
                    <Select value={order} onChange={(e) => setOrder(e)}>
                        <Option value='ASC'>A-Z</Option>
                        <Option value='DESC'>Z-A</Option>
                    </Select>
                </Col>
            </Row>
            <Link href={'/company/add'} passHref={true}>
                <Button type='dashed' style={{ marginBlockEnd: '1rem' }}>Add New Company</Button>
            </Link>
            <Table style={{ overflow: 'auto' }} dataSource={companies} columns={columns} pagination={false} />
            {totalPage && (
                <Pagination style={{ marginBlockStart: '1rem' }} onChange={(currentPage) => {
                    setCurrentPage(currentPage)
                }} current={currentPage} total={totalPage} />
            )}
        </Container>
    </>
}

export default Company