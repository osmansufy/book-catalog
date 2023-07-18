import { useAppSelector } from "@/redux/hook";
import { useMemo } from "react";

const WithIdToken = (Component: any) => {

    function WithIdTokenComponent(props: any) {


        const { user } = useAppSelector(state => state.user)

        const accessToken = useMemo(() => user?.stsTokenManager?.accessToken as string, [user])

        return <Component {...props} idToken={accessToken} />
    }

    return WithIdTokenComponent

}

export default WithIdToken