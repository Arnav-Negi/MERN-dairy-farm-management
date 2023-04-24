import * as React from "react";
import './Choose.css';
import Grid from '@mui/joy/Grid';
import { Link, useNavigate} from "react-router-dom"
import {setToken} from "../../utils/checkToken.jsx";
import axios from "axios";

export default function Choose() {
    const navigate = useNavigate();

    React.useEffect(() => {
        async function fetchData() {
            if (!setToken()) {
                try {
                    const response = await axios.get('http://localhost:5000/api/general');
                    console.log("general",  response.data);

                    const type = response.data.userType;

                    if (type === 'Vendor') {
                        navigate('/vendor/inventory');
                    }
                    else if (type === 'Customer') {
                        navigate('/customer/vendors-list');
                    }
                } catch {
                    return "get error, login again";
                }
            }
            else
            return "no token found";
        }

        fetchData().then(r => console.log(r)).catch(e => console.log(e));
    }, []);

    return (
        <React.Fragment>
                <div className="parent">
                <div className="child">
                    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ flexGrow: 1 }}>
                        <Grid>
                            <Link to="/auth" state={{user: "customer"}}>
                                <div className="card">
                                    <div className="wrapper">
                                        <img src="/src/assets/images/v1.png" className="cover-image" />
                                    </div>
                                    <img src="/src/assets/images/v9.png" className="title" />
                                    <img src="src/assets/images/c16.png" className="character" />
                                </div>
                            </Link>
                        </Grid>
                        <Grid>
                            <Link to="/auth" state={{ user: "vendor" }}>
                                <div className="card">
                                    <div className="wrapper">
                                        <img src="/src/assets/images/c14.png" className="cover-image" />
                                    </div>
                                    <img src="/src/assets/images/v2.png" className="title" />
                                    <img src="/src/assets/images/c15.png" className="character" />
                                </div>
                            </Link>
                        </Grid>
                    </Grid>
                    </div>
                </div>
        </React.Fragment>
    )
}