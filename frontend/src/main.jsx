import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import App from './App'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { StyledEngineProvider } from '@mui/joy/styles';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <BrowserRouter>
                <RecoilRoot>
                    <App />
                </RecoilRoot>
            </BrowserRouter>
        </StyledEngineProvider>
    </React.StrictMode>,
)
