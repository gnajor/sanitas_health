export function renderHeader(parentId){
    const parent = document.querySelector(parentId);
    parent.innerHTML = `<nav>
                            <div id="logo-container">
                                <img src="../media/icons/logo.png"></img>
                                <h2 id="logo-name">SanitasCare</h2>
                            </div>  
                            <div id="menu-container">
                                <a id="doctor-item">Doctors</a>
                                <a id="appointment-item">Appointments</a>
                                <a id="about-us-item">About Us</a>
                                <a id="price-list-item">Price List</a>
                            </div>
                            <button id="login-button">Login</button>
                        </nav>`;

    const doctorAnchor = parent.querySelector("#doctor-item");
    const appointmentAnchor = parent.querySelector("#appointment-item");
    const aboutUsAnchor = parent.querySelector("#about-us-item");
    const priceListAnchor = parent.querySelector("#price-list-item");

    doctorAnchor.addEventListener("click", () => {});
    appointmentAnchor.addEventListener("click", () => {});
    aboutUsAnchor.addEventListener("click", () => {});
    priceListAnchor.addEventListener("click", () => {});
}