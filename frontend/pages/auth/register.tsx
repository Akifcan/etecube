import { FC } from 'react'
import Container from '@/components/Container'
import { Input, Button } from 'antd'
import FormGroup from '@/components/FormGroup'
import Link from 'next/link'

const Register: FC = () => {
    return <Container>
        <main className='center column' style={{ width: '300px', margin: 'auto' }}>
            <FormGroup isRequired={true}>
                <Input type={'email'} placeholder='Your email' style={{ width: '100%' }} />
            </FormGroup>
            <FormGroup isRequired={true}>
                <Input type={'password'} placeholder='Your password' style={{ width: '100%' }} />
            </FormGroup>
            <FormGroup isRequired={true}>
                <Input placeholder='First Name' style={{ width: '100%' }} />
            </FormGroup>
            <FormGroup isRequired={true}>
                <Input placeholder='Last Name' style={{ width: '100%' }} />
            </FormGroup>
            <Button type="primary" size="large" loading={false} style={{ width: '100%' }}>
                Register
            </Button>
            <Link passHref={true} href='/auth/register'><a>Click here for login</a></Link>
        </main>
    </Container>
}

export default Register