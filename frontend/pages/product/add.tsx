import { FC, useCallback, useState } from 'react'
import Container from '@/components/Container'
import Validation, { FormProps } from '@/helpers/validation'
import { Button, Input, Select } from 'antd'
import Head from 'next/head'
import FormGroup from '@/components/FormGroup'
const { Option } = Select

const AddCompany: FC = () => {

    const [validation, setValidation] = useState<Validation>()
    const [disabled, setDisabled] = useState(true)

    const [name, setName] = useState<FormProps<string>>({ value: '', errorMessage: '' })
    const [amount, setAmount] = useState<FormProps<string>>({ value: '', errorMessage: '' })
    const [category, setCategory] = useState<FormProps<string>>({ value: 'turkey', errorMessage: '' })
    const [company, setCompany] = useState<FormProps<string>>({ value: '', errorMessage: '' })

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
        <Container header={{ title: 'Products', subtitle: 'Add Product' }}>
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
                                placeholder='Product Name'
                                style={{ width: '100%' }} />
                        </FormGroup>
                        <Button disabled={disabled} type='primary'>Create</Button>
                    </>
                )}

            </form>
        </Container>
    </>
}

export default AddCompany