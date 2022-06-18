import { FC, useState, useEffect } from 'react'
import http from '@/helpers/http'
import { CompanyProps } from '@/interfaces/company'
import { Spin, Table } from 'antd'
import Link from 'next/link'
import { IndexPageTableProps } from 'pages'


const CompanyTable: FC<IndexPageTableProps> = ({ onLoaded }) => {
    const [isLoading, setLoading] = useState(true)
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
        setLoading(false)
        const response = await http<{ count: number, companies: CompanyProps[] }>(`/company?page=${1}&last=last`, 'GET')
        setCompanies(response.data.companies)
        onLoaded(response.data.count)
    }

    useEffect(() => {
        loadCompanies()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return !isLoading ? <>
        <h3>Lastly added <Link passHref={true} href='/company'><a href="#">companies</a></Link></h3>
        <Table style={{ overflow: 'auto' }} dataSource={companies} columns={columns} pagination={false} />
    </> : <Spin size='large' />

}

export default CompanyTable