import { FC, useCallback, useState } from 'react'
import Container from '@/components/Container'
import Validation, { FormProps } from '@/helpers/validation'
import { Button, Input, Select } from 'antd'
import Head from 'next/head'
import FormGroup from '@/components/FormGroup'
import http from '@/helpers/http'
const { Option } = Select
import { useRouter } from 'next/router'

const AddCompany: FC = () => {

    const router = useRouter()

    const [validation, setValidation] = useState<Validation>()
    const [disabled, setDisabled] = useState(true)
    const [isLoading, setLoading] = useState(false)

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
    }, [])

    const onSubmit = async () => {
        setLoading(true)
        const response = await http<{ id: number }>('/company', 'POST', {
            name: name.value,
            legalNumber: legalNumber.value,
            country: country.value,
            website: website.value
        })
        if (response.statusCode === 201) {
            router.push(`/company/${response.data.id}`)
        }
        setLoading(false)
    }

    return <>
        <Head>
            <title>Add Company</title>
        </Head>
        <Container header={{ title: 'Companies', subtitle: 'Add Company' }} loginRequired={true}>
            <form ref={form} className='spacer'>
                {validation && (
                    <>
                        <FormGroup isRequired={true} errorMessage={name.errorMessage}>
                            <Input
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
                            type='primary'>Create</Button>
                    </>
                )}

            </form>
        </Container>
    </>
}

export default AddCompany