function renderHeader(parentId){
    const parent = document.querySelector(parentId);
    parent.innerHTML = `<nav>
                            <div id="logo-container">
                                <div id="logo"></div>
                                <div id="logo-name"></div>
                            </div>  
                            <div id="menu-container">
                                <div id="doctor-item">Doctors</div>
                                <div id="appointment-item">Appointments</div>
                                <div id="about-us-item">About Us</div>
                                <div id="price-list-item">Price List</div>
                            </div>
                            <button id="login-button">Login</button>
                        </nav>`;
}