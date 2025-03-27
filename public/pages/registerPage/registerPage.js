import { pageHandler } from "../../pageHandler/pageHandler.js";
import { generateNumberCombination } from "../../utils/utils.js";

export function renderRegisterPage(parentId){
    const parent = document.querySelector(parentId);

    parent.innerHTML = `<div id="register-page">
                            <div id="left-side">
                                <div class="logo-container">
                                    <img src="../media/icons/logo-white.png">
                                    <h2 id="logo-name">SanitasCare</h2>
                                </div>
                                <div id="main-content">
                                    <h1>A Smarter Way to Manage <br> Your Health</h1>
                                    <p>Get access to personalized healthcare at your fingertips. With your account, you can easily book appointments, find trusted doctors, and securely manage your medical records —all in one place.</p>
                                </div>
                                <button id="back-button">
                                    <img src="../media/icons/arrow-green.svg">
                                    <span> Back to menu </span>
                                </button>
                            </div>
                            <div id="right-side">
                                <div id="right-side-content">
                                    <h2>Fill in Your Details</h2>
                                    <div id="inputs-container">
                                        <div class="input-container" id="f-name">
                                            <span class="label-input">First name</span>
                                            <input placeholder="Enter your first name">
                                        </div>
                                        <div class="input-container" id="l-name">
                                            <span class="label-input">Last name</span>
                                            <input placeholder="Enter your last name">
                                        </div>
                                        <div class="input-container" id="address">
                                            <span class="label-input">Adress</span>
                                            <input placeholder="Enter your address">
                                        </div>
                                        <div class="input-container" id="gender">
                                            <span class="label-input">Gender</span>
                                            <select>
                                                <option>Select your gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>
                                        <div class="input-container" id="birthdate">
                                            <span class="label-input">Birthdate</span>
                                            <input type="date">
                                        </div>
                                        <div class="input-container" id="tel-num">
                                            <span class="label-input" type="number">Telephone number</span>
                                            <input placeholder="eg.0701601325">
                                        </div>
                                        <div class="input-container" id="medical-num">
                                            <span class="label-input" type="number">Medical number</span>
                                            <input placeholder="Will autogenerate">
                                        </div>
                                    </div>
                                    <button>Create My Account</button>
                                </div>
                            </div>
                        </div>`;

    const telInput = parent.querySelector("#tel-num input");
    const birthInput = parent.querySelector("#birthdate input");
    const genderInput = parent.querySelector("#gender select");
    const addressInput = parent.querySelector("#address input");
    const lastNameInput = parent.querySelector("#l-name input");
    const firstNameInput = parent.querySelector("#f-name input");
    const medicalNumInput = parent.querySelector("#medical-num input");

    medicalNumInput.value = generateNumberCombination(9);

    const registerButton = parent.querySelector("#right-side button");
    registerButton.addEventListener("click", () => {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];


        const userData = {
            phone_num: telInput.value,
            firstname: firstNameInput.value,
            lastname: lastNameInput.value,
            address: addressInput.value,
            gender: genderInput.value,
            birthdate: birthInput.value,
            medical_num: medicalNumInput.value,
            reg_date: formattedDate,
            role: "patient"
        }

        pageHandler.handleRegisterPatient(userData);
    }); 

    const backButton = parent.querySelector("#left-side button");
    backButton.addEventListener("click", () => {
        pageHandler.handleHomePageRender();
    });
}