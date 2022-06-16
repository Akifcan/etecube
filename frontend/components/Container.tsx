import { useAuth } from '@/hooks/useAuth'
import { FC, ReactNode } from 'react'
import { Spin, PageHeader, Button } from 'antd'
import { useRouter } from 'next/router'

interface ContainerProps {
    header?: { title: string, subtitle?: string }
    children: ReactNode
}

const Container: FC<ContainerProps> = ({ children, header }) => {

    const { isLoading, user, logout } = useAuth()
    const router = useRouter()

    return !isLoading ? (
        <>
            <div className='body'>
                {header && (
                    <PageHeader
                        ghost={false}
                        style={{ width: '100%', }}
                        onBack={() => router.back()}
                        title={header.title}
                        subTitle={header.subtitle}
                        extra={user ? [
                            <Button key="2" style={{ textTransform: 'capitalize' }}>{user.firstName} {user.lastName}</Button>,
                            <Button onClick={logout!} key="1" type="primary">
                                Logout
                            </Button>,
                        ] : []}
                    />
                )}
            </div>
            <div className='container' style={{ marginBlock: '1rem' }}>
                {children}
            </div>
        </>
    ) : <div className='center'><Spin size="large" /></div>

}

export default Container