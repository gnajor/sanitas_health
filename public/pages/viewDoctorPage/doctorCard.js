import { pageHandler } from "../../pageHandler/pageHandler.js";

export function renderDoctorCard(parentId, doctor, userData){
    const parent = document.querySelector(parentId);

    const card = document.createElement("div");
    card.className = "card";
    parent.appendChild(card);

    card.innerHTML = `<div class="text-container">
                        <h3>${doctor.full_name}</h3>
                        <p>${doctor.name}</p>
                        <p>${doctor.phone_num}</p>
                        <p>${doctor.visit_cost}kr</p>
                        <button>View available days</button>
                    </div>
                    <hr>`;
    const button = card.querySelector("button");

    if(userData.admin){
        button.textContent = "Delete";
        button.addEventListener("click", () => {
            pageHandler.handleDeleteDoctor(doctor.employee_num);
            card.remove();
        });
    }
    else{
        button.addEventListener("click", () => {
            pageHandler.handleRenderBookingPage(doctor.employee_num);
        });
    }
}