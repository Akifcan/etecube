import { FC, useCallback, useState } from 'react'
import Container from '@/components/Container'
import { Input, Button, Alert } from 'antd'
import FormGroup from '@/components/FormGroup'
import Link from 'next/link'
import Validation, { FormProps } from '@/helpers/validation'
import { useAuth } from '@/hooks/useAuth'

const Login: FC = () => {

    const [validation, setValidation] = useState<Validation>()
    const [email, setEmail] = useState<FormProps<string>>({ value: '', errorMessage: '' })
    const [password, setPassword] = useState<FormProps<string>>({ value: '', errorMessage: '' })

    const [disabled, setDisabled] = useState(true)

    const { errorMessage, login, isLoading } = useAuth()

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

    const onSubmit = () => login!(email.value, password.value)

    return <Container>
        <form ref={form} className='center column' style={{ width: '300px', margin: 'auto' }}>
            {validation && (
                <>
                    {errorMessage && (
                        <Alert
                            style={{ width: '100%' }}
                            message="An Error Occured"
                            description={errorMessage}
                            type="warning"
                            closable
                        />
                    )}
                    <FormGroup isRequired={true} errorMessage={email.errorMessage}>
                        <Input
                            onChange={(e) => {
                                setEmail({
                                    value: e.target.value,
                                    errorMessage: validation.setValue(e.target.value).notEmpty().email().validate()
                                })
                            }}
                            placeholder='Your email'
                            style={{ width: '100%' }} />
                    </FormGroup>
                    <FormGroup isRequired={true} errorMessage={password.errorMessage}>
                        <Input
                            type={'password'}
                            onChange={(e) => {
                                setPassword({
                                    value: e.target.value,
                                    errorMessage: validation.setValue(e.target.value).notEmpty().validate()
                                })
                            }}
                            placeholder='Your password'
                            style={{ width: '100%' }} />
                    </FormGroup>
                    <Button
                        onClick={onSubmit}
                        disabled={disabled}
                        type="primary"
                        size="large"
                        loading={isLoading}
                        style={{ width: '100%' }}>
                        Login
                    </Button>
                    <Link passHref={true} href='/auth/register'><a>Click here for register</a></Link>
                </>
            )}
        </form>
    </Container>
}

export default Login