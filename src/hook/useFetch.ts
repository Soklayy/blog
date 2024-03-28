import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { axiosInstance } from "../api/axios.instance"
import { useAppSelector } from "../redux/hook"

export const useGet = <T>(url: string) => {
    const auth = useAppSelector(state => state.auth)
    const [responseData, setResponseData] = useState<T>()
    useEffect(() => {
        axiosInstance.get(url, {
            headers: {
                Authorization: `Bearer ${auth?.accessToken}`
            }
        }).then((response) => {
            if (response.status === 200) {
                setResponseData(response.data)
            }
        }).catch((err: any) => {
            alert(err?.code + ': ' + err?.response.data.message)
        })
    }, [url])

    return [responseData, setResponseData] as [T, Dispatch<SetStateAction<T>>]
}

