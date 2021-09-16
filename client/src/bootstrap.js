import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './styles/main.css';

const mount = (el, identity) => {
    ReactDOM.render(<App identity={identity} />,
    el
    );
}

if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#root-MentalHealth')

    if (devRoot) {
        mount(devRoot);
    }
}

export { mount };

