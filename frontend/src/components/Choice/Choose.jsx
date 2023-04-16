import * as React from "react";
import './Choose.css';
import Grid from '@mui/joy/Grid';
import { Link } from "react-router-dom"

export default function Choose() {
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