import { FC, useCallback, useState, useEffect } from 'react'
import Container from '@/components/Container'
import Validation, { FormProps } from '@/helpers/validation'
import { Button, Input, Select, notification } from 'antd'
import Head from 'next/head'
import FormGroup from '@/components/FormGroup'
import { CompanyProps } from '@/interfaces/company'
import http from '@/helpers/http'
const { Option } = Select
import { useRouter } from 'next/router'
import { ProductProps } from '@/interfaces/product'

const EditProduct: FC = () => {

    const [validation, setValidation] = useState<Validation>()
    const [disabled, setDisabled] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const router = useRouter()

    const [categories, setCategories] = useState<string[]>([])
    const [companies, setCompanies] = useState<CompanyProps[]>([])

    const [name, setName] = useState<FormProps<string>>({ value: '', errorMessage: '' })
    const [amount, setAmount] = useState<FormProps<string>>({ value: '', errorMessage: '' })
    const [category, setCategory] = useState<FormProps<string>>({ value: 'category', errorMessage: '' })
    const [company, setCompany] = useState<FormProps<string>>({ value: 'company', errorMessage: '' })

    const loadCategories = async () => {
        setCategories((await http<string[]>('/product/categories', 'GET')).data)
    }

    const loadCompanies = async () => {
        setCompanies((await http<CompanyProps[]>('/company/all', 'GET')).data)
    }

    const form = useCallback((node: HTMLFormElement) => {
        if (!node) return

        setValidation(new Validation(node))
        node.addEventListener('valid', () => {
            if (company.value !== 'company' && category.value !== 'category') {
                setDisabled(false)
            } else {
                setDisabled(true)
            }
        });
        node.addEventListener('not-valid', () => {
            setDisabled(true)
        })
    }, [company.value, category.value, amount.value, name.value])

    const onSubmit = async () => {
        setLoading(true)
        const response = await http(`/product/${router.query.id}`, 'PATCH', {
            name: name.value,
            amount: +amount.value,
            category: category.value,
            company: { id: +company.value }
        })
        if (response.statusCode === 200) {
            notification.open({
                message: 'Updated',
            })
        }
        setLoading(false)
    }

    useEffect(() => {
        Promise.all([loadCategories(), loadCompanies()])
    }, [])

    const loadProductDetails = async () => {
        const response = await http<ProductProps>(`/product/${router.query.id}`, 'GET')
        if (response.statusCode === 200) {
            setName({ value: response.data.name, errorMessage: undefined })
            setAmount({ value: response.data.amount.toString(), errorMessage: undefined })
            setCategory({ value: response.data.category, errorMessage: undefined })
            setCompany({ value: response.data.company.id.toString(), errorMessage: undefined })
            console.log(response);
        } else {
            router.push('/404')
        }
    }

    useEffect(() => {
        if (!router.query.id) return
        loadProductDetails()
    }, [router])

    return <>
        <Head>
            <title>Edit Product</title>
        </Head>
        <Container header={{ title: 'Products', subtitle: 'Edit Product' }} loginRequired={true}>
            <form ref={form} className='spacer'>
                {validation && (
                    <>
                        <FormGroup isRequired={true} errorMessage={name.errorMessage}>
                            <Input
                                value={name.value}
                                onChange={(e) => {
                                    setName({
                                        value: e.target.value,
                                        errorMessage: validation.setValue(e.target.value).notEmpty().validate()
                                    })
                                }}
                                placeholder='Product Name'
                                style={{ width: '100%' }} />
                        </FormGroup>
                        <FormGroup isRequired={true} errorMessage={amount.errorMessage}>
                            <Input
                                value={amount.value}
                                onChange={(e) => {
                                    setAmount({
                                        value: e.target.value,
                                        errorMessage: validation.setValue(e.target.value).notEmpty().validate()
                                    })
                                }}
                                placeholder='Amount'
                                style={{ width: '100%' }} />
                        </FormGroup>
                        <FormGroup isRequired={false} errorMessage={category.errorMessage}>
                            <Select
                                style={{ width: '100%' }}
                                value={category.value}
                                onChange={(e) => {
                                    setCategory({
                                        value: e,
                                        errorMessage: validation.setValue(e).notEmpty().validate()
                                    })
                                }}
                            >
                                <Option value='category'>Category</Option>
                                {categories.map(category => {
                                    return <Option key={category}>{category}</Option>
                                })}
                            </Select>
                        </FormGroup>
                        <FormGroup isRequired={false} errorMessage={company.errorMessage}>
                            <Select
                                style={{ width: '100%' }}
                                value={company.value}
                                onChange={(e) => {
                                    setCompany({
                                        value: e,
                                        errorMessage: validation.setValue(e).notEmpty().validate()
                                    })
                                }}
                            >
                                <Option value='company'>Company</Option>
                                {companies.map(company => {
                                    return <Option key={company.id} value={company.id.toString()}>{company.name}</Option>
                                })}
                            </Select>
                        </FormGroup>
                        <Button
                            onClick={onSubmit}
                            loading={isLoading}
                            disabled={disabled}
                            type='primary'>Update</Button>
                    </>
                )}

            </form>
        </Container>
    </>
}

export default EditProduct