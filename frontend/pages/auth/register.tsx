import { FC, useState, useCallback, useRef } from 'react'
import Container from '@/components/Container'
import { Input, Button } from 'antd'
import FormGroup from '@/components/FormGroup'
import Link from 'next/link'
import Validation, { FormProps } from '@/helpers/validation'
import { useAuth } from '@/hooks/useAuth'

const Register: FC = () => {

    const [validation, setValidation] = useState<Validation>()
    const [email, setEmail] = useState<FormProps<string>>({ value: '', errorMessage: '' })
    const [password, setPassword] = useState<FormProps<string>>({ value: '', errorMessage: '' })
    const [firstName, setFirstname] = useState<FormProps<string>>({ value: '', errorMessage: '' })
    const [lastname, setLastname] = useState<FormProps<string>>({ value: '', errorMessage: '' })

    const [disabled, setDisabled] = useState(true)

    const { register } = useAuth()

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

    const onSubmit = () => {
        register!({
            email: email.value,
            password: password.value,
            firstName: firstName.value,
            lastName: lastname.value
        })
    }

    return <Container>
        <form
            ref={form}
            className='center column' style={{ width: '300px', margin: 'auto' }}>
            {validation && (
                <>
                    <FormGroup isRequired={true} errorMessage={email.errorMessage}>
                        <Input
                            onChange={(e) => {
                                setEmail({
                                    value: e.target.value,
                                    errorMessage: validation.setValue(e.target.value).notEmpty().email().validate()
                                })
                            }}
                            type={'email'}
                            placeholder='Your email'
                            style={{ width: '100%' }} />
                    </FormGroup>
                    <FormGroup isRequired={true} errorMessage={password.errorMessage}>
                        <Input
                            onChange={(e) => {
                                setPassword({
                                    value: e.target.value,
                                    errorMessage: validation.setValue(e.target.value).notEmpty().validate()
                                })
                            }}
                            type={'password'}
                            placeholder='Your password'
                            style={{ width: '100%' }} />
                    </FormGroup>
                    <FormGroup isRequired={true} errorMessage={firstName.errorMessage}>
                        <Input
                            onChange={(e) => {
                                setFirstname({
                                    value: e.target.value,
                                    errorMessage: validation.setValue(e.target.value).notEmpty().validate()
                                })
                            }}
                            placeholder='First Name'
                            style={{ width: '100%' }} />
                    </FormGroup>
                    <FormGroup isRequired={true} errorMessage={lastname.errorMessage}>
                        <Input
                            onChange={(e) => {
                                setLastname({
                                    value: e.target.value,
                                    errorMessage: validation.setValue(e.target.value).notEmpty().validate()
                                })
                            }}
                            placeholder='Last Name'
                            style={{ width: '100%' }} />
                    </FormGroup>
                    <Button
                        onClick={onSubmit}
                        disabled={disabled}
                        type="primary"
                        size="large"
                        loading={false}
                        style={{ width: '100%' }}>
                        Register
                    </Button>
                    <Link passHref={true} href='/auth/login'><a>Click here for login</a></Link>
                </>
            )}
        </form>
    </Container>
}

export default Register