import useSWR from 'swr'


// import { storageService } from './storage.service'
// let token = 'Bearer ' + storageService.getToken();
// const { data: user } = useSWR(['/api/user', token], ([url, token]) => fetchWithToken(url, token))

const fetcher = (url, t) => fetch(url, {
    method: 'GET',
    headers : {
        'Authorization' : t
    }
}).then((res) => res.json())

export const fetcherService = {
    fetcher
}