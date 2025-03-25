import { renderLoginMenu } from "./login.js";
import { renderEditProfile } from "./editMenu.js";

export function renderHeader(parentId, userData = null){
    const parent = document.querySelector(parentId);
    parent.innerHTML = `<nav>
                            <div class="logo-container">
                                <img src="../media/icons/logo.png">
                                <h2 id="logo-name">SanitasCare</h2>
                            </div>  
                            <div id="menu-container">
                                <a id="doctor-item">Doctors</a>
                                <a id="appointment-item">Appointments</a>
                                <a id="about-us-item">About Us</a>
                                <a id="price-list-item">Price List</a>
                            </div>
                            <button id="login-button">Login</button>
                        </nav>
                        <div id="menu"></div>`;

    const doctorAnchor = parent.querySelector("#doctor-item");
    const appointmentAnchor = parent.querySelector("#appointment-item");
    const aboutUsAnchor = parent.querySelector("#about-us-item");
    const priceListAnchor = parent.querySelector("#price-list-item");

    const loginButton = parent.querySelector("#login-button");
    const menu = parent.querySelector("#menu");

    if(userData){
        renderEditProfile("#menu", userData);
        loginButton.textContent = (userData.firstname + " " + userData.lastname);
    }
    else{
        renderLoginMenu("#menu");
    }

    loginButton.addEventListener("click", () => {
        if(menu.className !== "open"){
            menu.classList.add("open");
        }
    });

    doctorAnchor.addEventListener("click", () => {});
    appointmentAnchor.addEventListener("click", () => {});
    aboutUsAnchor.addEventListener("click", () => {});
    priceListAnchor.addEventListener("click", () => {});
}
