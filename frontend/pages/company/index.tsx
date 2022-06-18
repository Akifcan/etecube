import { FC, useState, useEffect } from 'react'
import Container from '@/components/Container'
import { Table, Button, Pagination } from 'antd'
import Head from 'next/head'
import Link from 'next/link'
import http from '@/helpers/http'
import { CompanyProps } from '@/interfaces/company'

const Company: FC = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState<number>()

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
    ]

    const loadCompanies = async () => {
        const companies = await http<{ total: number, companies: CompanyProps[] }>(`/company?page=${currentPage}`, 'GET')
        setCompanies(companies.data.companies.map((company) => {
            return { ...company, key: company.id }
        }))
        setTotalPage(companies.data.total * 10)
    }

    useEffect(() => {
        loadCompanies()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage])

    return <>
        <Head>
            <title>Companies</title>
        </Head>
        <Container header={{ title: 'Companies', subtitle: 'Manage Companies' }}>
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