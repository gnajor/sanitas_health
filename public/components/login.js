import { pageHandler } from "../pageHandler/pageHandler.js";

export function renderLoginMenu(parentId){
    const parent = document.querySelector(parentId);

    parent.innerHTML = `<div id="login">
                            <button class="close">
                                <img src="../media/icons/close.svg">
                            </button>
                            <div id="title-login-container">
                                <div id="title">
                                    <h2>Welcome <br> Back</h2>
                                </div>
                                <div id="login-container">
                                    <div class="input-container">
                                        <span class="label-input">Medical Number</span>
                                        <input type="password" placeholder="9-digits">
                                    </div>
                                    <button id="login-button">Login</button>
                                </div>
                            </div>
                            <div id="register-container">
                                <h3>Join Sanitas Health</h3>
                                <p>At Sanitas Health, we make it easy for you to get the care you deserve. Whether you're looking for a trusted primary care provider or specialized treatment, our expert team is here to support your health journey every step of the way.</p>
                                <button id="register-button">Become a patient</button>
                            </div>
                        </div>`;

    const medNumInput = parent.querySelector("input");

    const loginButton = parent.querySelector("#login-button");
    const registerButton = parent.querySelector("#register-button");
    const closeLogin = parent.querySelector(".close");

    closeLogin.addEventListener("click", () => {
        parent.classList.remove("open");
    });

    loginButton.addEventListener("click", () => {
        pageHandler.handleLogin(medNumInput.value);
    });

    registerButton.addEventListener("click", () => {
        pageHandler.handleRegisterPageRender();
    });
}