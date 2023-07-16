import { auth } from "@/lib/firebase";
import { useAppSelector } from "@/redux/hook";
import { useState, useEffect, useMemo } from "react";

const WithIdToken = (Component: any) => {

    function WithIdTokenComponent(props: any) {

        // const [idToken, setIdToken] = useState('' as string)
        // useEffect(() => {
        //     if (!auth.currentUser) return
        //     auth.currentUser.getIdToken(true).then((token) => {
        //         console.log({ token })
        //         setIdToken(token)
        //     })
        // }, [auth.currentUser])

        const { user } = useAppSelector(state => state.user)

        const accessToken = useMemo(() => user?.stsTokenManager?.accessToken as string, [user])

        return <Component {...props} idToken={accessToken} />
    }

    return WithIdTokenComponent

}

export default WithIdToken