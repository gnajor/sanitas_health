import { pageHandler } from "../pageHandler/pageHandler.js";

export function renderEditProfile(parentId, userdata){
    const parent = document.querySelector(parentId);

    console.log(userdata)

    parent.innerHTML = `<div id="edit-profile">
                            <button class="close">
                                <img src="../media/icons/close.svg">
                            </button>
                            <div id="title">
                                <h2>${userdata.firstname + " " + userdata.lastname} </h2>
                            </div>
                            <div id="input-containers">
                                <div id="inputs-container" class="no-edit">
                                    <div class="input-container" id="f-name">
                                        <span class="label-input">First name</span>
                                        <input value=${userdata.firstname}>
                                    </div>
                                    <div class="input-container" id="l-name">
                                        <span class="label-input">Last name</span>
                                        <input value=${userdata.lastname}>
                                    </div>
                                </div>
                            </div>
                            <div id="button-container">
                                <button id="edit-button">
                                    <img src="">
                                    <span>Edit</span>
                                </button>
                                <button id="confirm-button" class="none">Confirm</button>
                                <button id="logout-button">
                                    <img src="">
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>`;


        const editButton = parent.querySelector("#edit-button");
        const logoutButton = parent.querySelector("#logout-button");
        const closeButton = parent.querySelector(".close");
        const confirmButton = parent.querySelector("#confirm-button");

    if(userdata.patient){
        const inputsContainer = parent.querySelector("#inputs-container");

        inputsContainer.innerHTML += `  <div class="input-container" id="tel-num">
                                        <span class="label-input" type="number">Telephone number</span>
                                        <input value=${userdata.phone_num}>
                                    </div>
                                    <div class="input-container" id="gender">
                                        <span class="label-input">Gender</span>
                                        <select></select>
                                    </div>
                                    <div class="input-container" id="address">
                                        <span class="label-input">Adress</span>
                                        <input value="${userdata.address}">
                                    </div>
                                    <div class="input-container" id="birthdate">
                                        <span class="label-input">Birthdate</span>
                                        <input value=${userdata.birthdate.slice(0, 10)} type="date">
                                    </div>
                                    <div class="input-container" id="med-num">
                                        <span class="label-input" type="number">Medical number</span>
                                        <input value=${userdata.id_num}>
                                    </div>`;

        const select = parent.querySelector("select");
        const fNameInput = parent.querySelector("#f-name input");
        const lNameInput = parent.querySelector("#l-name input");
        const telNumInput = parent.querySelector("#tel-num input");
        const addressInput = parent.querySelector("#address input");
        const birthDateInput = parent.querySelector("#birthdate input");

        confirmButton.addEventListener("click", () => {
            const dataChange = {
                firstname: fNameInput.value,
                lastname: lNameInput.value,
                phone_num: telNumInput.value,
                address: addressInput.value,
                birthdate: birthDateInput.value,
                gender: select.value,
                medical_num: userdata.id_num,
            }

            confirmButton.classList.add("none");
            editButton.classList.remove("none");
            inputsContainer.classList.add("no-edit");


            pageHandler.handleProfileChange(dataChange);
        });

        editButton.addEventListener("click", () => {
            editButton.classList.add("none");
            inputsContainer.classList.remove("no-edit");
            confirmButton.classList.remove("none");
        });

        if(userdata.gender === "male"){
            select.innerHTML = `<option value="male">Male</option>
                                <option value="female">Female</option>`;
        }
        else{
            select.innerHTML = `<option value="female">Female</option>
                                <option value="male">Male</option>`;
        }

    }

    if(!userdata.patient){
        parent.querySelectorAll("input").forEach(element => {
            if(element.value === "undefined" || element.value === ""){
                element.parentElement.remove();
            }
        });

        editButton.remove();
    }

    closeButton.addEventListener("click", () => {
        parent.classList.remove("open");
    });

    logoutButton.addEventListener("click", () => {
        pageHandler.handleLogout();
    });

}