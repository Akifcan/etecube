import Cookies from 'js-cookie'

const http = async<T>(url: string, method: 'POST' | 'GET' | 'PATH' | 'DELETE', body: Record<string, any> = {}) => {

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

    const response = await fetch(`http://localhost:3000${url}`, fetchItems)
    return { statusCode: response.status, data: await response.json() as T }
}

export default http