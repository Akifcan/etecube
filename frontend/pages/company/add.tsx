import { FC, useCallback, useState } from 'react'
import Container from '@/components/Container'
import Validation, { FormProps } from '@/helpers/validation'
import { Button, Input, Select } from 'antd'
import Head from 'next/head'
import FormGroup from '@/components/FormGroup'
const { Option } = Select

const AddCompany: FC = () => {

    const [validation, setValidation] = useState<Validation>()
    const [disabled, setDisabled] = useState(false)

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

    return <>
        <Head>
            <title>Add Company</title>
        </Head>
        <Container header={{ title: 'Home', subtitle: 'Add Company' }}>
            <form ref={form}>
                {validation && (
                    <>
                        <FormGroup isRequired={true} errorMessage={name.errorMessage}>
                            <Input
                                onChange={(e) => {
                                    setName({
                                        value: e.target.value,
                                        errorMessage: validation.setValue(e.target.value).notEmpty().email().validate()
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
                                        errorMessage: validation.setValue(e.target.value).notEmpty().email().validate()
                                    })
                                }}
                                placeholder='Website'
                                style={{ width: '100%' }} />
                        </FormGroup>
                        <FormGroup isRequired={true} errorMessage={country.errorMessage}>
                            <Select
                                value={country.value}
                                style={{ width: '100%' }}
                                onChange={(e) => {
                                    setCountry({
                                        value: e,
                                        errorMessage: validation.setValue(e).notEmpty().email().validate()
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
                                        errorMessage: validation.setValue(e.target.value).notEmpty().email().validate()
                                    })
                                }}
                                type='number'
                                placeholder='Legal Number'
                                style={{ width: '100%' }} />
                        </FormGroup>
                    </>
                )}

            </form>
        </Container>
    </>
}

export default AddCompany