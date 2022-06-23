import Cookies from 'js-cookie'

const http = async<T>(url: string, method: 'POST' | 'GET' | 'PATCH' | 'DELETE', body: Record<string, any> = {}) => {

    const fetchItems = {
        method,
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`
        },
    }

    if (method != 'GET') {
        (fetchItems as any).body = JSON.stringify(body)
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API}${url}`, fetchItems)
    return { statusCode: response.status, data: await response.json() as T }
}

export default http