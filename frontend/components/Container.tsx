import { useAuth } from '@/hooks/useAuth'
import { FC, ReactNode, useEffect, useState } from 'react'
import { Spin, PageHeader, Button } from 'antd'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface ContainerProps {
    header?: { title: string, subtitle?: string }
    children: ReactNode
    loginRequired?: boolean
}

const Container: FC<ContainerProps> = ({ children, header, loginRequired = false }) => {

    const { isLoading, user, logout } = useAuth()
    const router = useRouter()
    const [canShow, setCanShow] = useState(false)

    useEffect(() => {
        if (loginRequired) {
            if (user) {
                setCanShow(true)
            } else {
                setCanShow(false)
            }
        } else {
            setCanShow(true)
        }
    }, [loginRequired, user])

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
                            <Button key="1" style={{ textTransform: 'capitalize' }}>{user.firstName} {user.lastName}</Button>,
                            <Link key="2" passHref={true} href={"/"}>
                                <Button style={{ background: 'orange', color: 'white' }}>
                                    Home Page
                                </Button>
                            </Link>,
                            <Button onClick={logout!} key="3" type="primary">
                                Logout
                            </Button>,
                        ] : []}
                    />
                )}
            </div>
            <div className='container' style={{ marginBlock: '1rem' }}>
                {canShow && children}
                {!canShow && <p>please wait</p>}
            </div>
        </>
    ) : <div className='center'><Spin size="large" /></div>

}

export default Container