import * as React from 'react';
import axios from 'axios'
import Root from "./url"
import { useParams } from 'react-router-dom';

export default function Verify() {

    const { user_id, token, type } = useParams()

    const [verify, setVerify] = React.useState(false)

    React.useEffect(async () => {
        async function verifyUser() {
            try {
                const url = Root() + "/" + type + "/" + user_id + "/verify/" + token
                const response = await axios.get(url)
                if (response.data === "Verified") setVerify(true)
            } catch (error) {
                console.error(error);
            }
        }

        await verifyUser()
    }, [token])
    
    if (verify) return <h1>Verified</h1>
    else return <h1>Not Verified</h1>
}
