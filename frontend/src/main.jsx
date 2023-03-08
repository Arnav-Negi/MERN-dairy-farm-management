import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import App from './App'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {RecoilRoot} from "recoil";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <RecoilRoot>
                <App/>
            </RecoilRoot>
        </BrowserRouter>
    </React.StrictMode>,
)
