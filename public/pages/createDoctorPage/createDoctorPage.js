import { renderHeader } from "../../components/header.js";
import { pageHandler } from "../../pageHandler/pageHandler.js";
import { generateNumberCombination } from "../../utils/utils.js";

export function renderCreateDoctorPage(parentId, userData){
    const parent = document.querySelector(parentId);
    parent.innerHTML = `<div id="create-doctor-page" class="page">
                            <header></header>
                            <main>
                                <input type="text" placeholder="Doctor name" id="doctor-name">
                                <input type="text" placeholder="Specialisation" id="doctor-specialisation">
                                <input type="tel" placeholder="Phone number" id="doctor-phone-num">
                                <input type="number" id="employee-num">
                                <button id="submit-create">Submit and Create</button>
                            </main>
                        </div>`;
    renderHeader("header", userData);

    const nameInput = parent.querySelector("#doctor-name");
    const specialInput = parent.querySelector("#doctor-specialisation");
    const phoneNumInput = parent.querySelector("#doctor-phone-num");
    const employeeNumInput = parent.querySelector("#employee-num");
    const submitButton = parent.querySelector("#submit-create");

    employeeNumInput.value = generateNumberCombination(6);

    submitButton.addEventListener("click", () => {
        const doctorInfo = {
            full_name: nameInput.value,
            specialisation: specialInput.value,
            phone_num: phoneNumInput.value,
            employee_num: employeeNumInput.value
        }

        pageHandler.handleCreateDoctor(doctorInfo);
    });
}