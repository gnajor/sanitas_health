export function renderEditProfile(parentId){
    const parent = document.querySelector(parentId);

    parent.innerHTML = `<div id="edit-profile">
                            <button class="close">
                                <img src="../media/icons/close.svg">
                            </button>
                            <div id="title">
                                <h2>Leo Mühl</h2>
                            </div>
                            <div id="input-containers">
                                <div id="inputs-container">
                                    <div class="input-container" id="f-name">
                                        <span class="label-input">First name</span>
                                        <input value="Leo">
                                    </div>
                                    <div class="input-container" id="l-name">
                                        <span class="label-input">Last name</span>
                                        <input value="Mühl">
                                    </div>
                                    <div class="input-container" id="tel-num">
                                        <span class="label-input" type="number">Telephone number</span>
                                        <input value="0721901328">
                                    </div>
                                    <div class="input-container" id="gender">
                                        <span class="label-input">Gender</span>
                                        <select>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                    <div class="input-container" id="adress">
                                        <span class="label-input">Adress</span>
                                        <input value="Svedala, Byggmästaregatan 2">
                                    </div>
                                    <div class="input-container" id="birthdate">
                                        <span class="label-input">Birthdate</span>
                                        <input value="2004-07-31" type="date">
                                    </div>
                                    <div class="input-container" id="med-num">
                                        <span class="label-input" type="number">Medical number</span>
                                        <input value="0721901328">
                                    </div>
                                </div>
                            </div>
                            <div id="button-container">
                                <button id="edit-button">
                                    <img src="">
                                    <span>Edit</span>
                                </button>
                                <button id="logout-button">
                                    <img src="">
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>`;

    const editButton = parent.querySelector("#edit-button");
    const logoutButton = parent.querySelector("#logout-button");
    const closeButton = parent.querySelector(".close");

    closeButton.addEventListener("click", () => {
        parent.classList.remove("open");
    });
    editButton.addEventListener("click", () => {});
    logoutButton.addEventListener("click", () => {});

}