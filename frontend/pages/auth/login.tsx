import { FC } from 'react'
import Container from '@/components/Container'
import { Input, Button } from 'antd'
import FormGroup from '@/components/FormGroup'
import Link from 'next/link'

const Login: FC = () => {
    return <Container>
        <main className='center column' style={{ width: '300px' }}>
            <FormGroup isRequired={true}>
                <Input placeholder='Your email' style={{ width: '100%' }} />
            </FormGroup>
            <FormGroup isRequired={true}>
                <Input placeholder='Your password' style={{ width: '100%' }} />
            </FormGroup>
            <Button type="primary" size="large" loading={false} style={{ width: '100%' }}>
                Login
            </Button>
            <Link passHref={true} href='/auth/register'><a>Click here for register</a></Link>
        </main>
    </Container>
}

export default Login