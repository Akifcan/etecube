import { FC, useCallback, useState, useEffect } from 'react'
import Container from '@/components/Container'
import Validation, { FormProps } from '@/helpers/validation'
import { Button, Input, Select, notification } from 'antd'
import Head from 'next/head'
import FormGroup from '@/components/FormGroup'
import http from '@/helpers/http'
const { Option } = Select
import { useRouter } from 'next/router'
import { CompanyProps } from '@/interfaces/company'

const EditCompany: FC = () => {

    const [validation, setValidation] = useState<Validation>()
    const [disabled, setDisabled] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const router = useRouter()

    const [name, setName] = useState<FormProps<string>>({ value: '', errorMessage: '' })
    const [legalNumber, setLegalNumber] = useState<FormProps<string>>({ value: '', errorMessage: '' })
    const [country, setCountry] = useState<FormProps<string>>({ value: 'turkey', errorMessage: '' })
    const [website, setWebsite] = useState<FormProps<string>>({ value: '', errorMessage: '' })

    const form = useCallback((node: HTMLFormElement) => {
        if (!node) return

        setValidation(new Validation(node))
        node.addEventListener('valid', () => {
            setDisabled(false)
        });
        node.addEventListener('not-valid', () => {
            setDisabled(true)
        })
    }, [name.value, legalNumber.value, country.value, website.value])

    const loadCompanyDetails = async () => {
        const id = +(router.query.id as string)
        const response = await http<CompanyProps>(`/company/${id}`, 'GET')
        if (response.statusCode === 200) {
            setName({ value: response.data.name, errorMessage: undefined })
            setLegalNumber({ value: response.data.legalNumber.toString(), errorMessage: undefined })
            setCountry({ value: response.data.country, errorMessage: undefined })
            setWebsite({ value: response.data.website, errorMessage: undefined })
        } else {
            router.push('/404')
        }
    }

    useEffect(() => {
        if (!router.query.id) return
        loadCompanyDetails()
    }, [router])

    const onSubmit = async () => {
        setLoading(true)
        const response = await http(`/company/${router.query.id}`, 'PATCH', {
            name: name.value,
            legalNumber: legalNumber.value,
            country: country.value,
            website: website.value
        })
        if (response.statusCode === 200) {
            notification.open({
                message: 'Updated',
            })
        }
        setLoading(false)
    }

    return <>
        <Head>
            <title>Edit Company</title>
        </Head>
        <Container header={{ title: 'Companies', subtitle: 'Edit Company' }} loginRequired={true}>
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
                                placeholder='Company Name'
                                style={{ width: '100%' }} />
                        </FormGroup>
                        <FormGroup isRequired={true} errorMessage={website.errorMessage}>
                            <Input
                                value={website.value}
                                onChange={(e) => {
                                    setWebsite({
                                        value: e.target.value,
                                        errorMessage: validation.setValue(e.target.value).notEmpty().customRegex("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?").validate()
                                    })
                                }}
                                placeholder='Website'
                                style={{ width: '100%' }} />
                        </FormGroup>
                        <FormGroup isRequired={false} errorMessage={country.errorMessage}>
                            <Select
                                value={country.value}
                                style={{ width: '100%' }}
                                onChange={(e) => {
                                    setCountry({
                                        value: e,
                                        errorMessage: validation.setValue(e).notEmpty().validate()
                                    })
                                }}
                            >
                                <Option value="turkey">Turkey</Option>
                                <Option value="usa">USA</Option>
                                <Option value="germany">Germany</Option>
                                <Option value="france">France</Option>
                            </Select>
                        </FormGroup>
                        <FormGroup isRequired={true} errorMessage={legalNumber.errorMessage}>
                            <Input
                                value={legalNumber.value}
                                onChange={(e) => {
                                    setLegalNumber({
                                        value: e.target.value,
                                        errorMessage: validation.setValue(e.target.value).notEmpty().validate()
                                    })
                                }}
                                type='number'
                                placeholder='Legal Number'
                                style={{ width: '100%' }} />
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

export default EditCompany