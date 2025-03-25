import { pageHandler } from "../../../pageHandler/pageHandler.js";

export function renderDoctorCard(parentId, doctor){
    const parent = document.querySelector(parentId);

    const card = document.createElement("div");
    card.className = "card";
    parent.appendChild(card);

    card.innerHTML = `<div class="text-container">
                        <h3>${doctor.full_name}</h3>
                        <p>${doctor.specialisation}</p>
                        <p>${doctor.phone_num}</p>
                        <p>${doctor.cost}</p>
                    </div>
                    <button>View available days</button>
                    <hr>`;
    
    const button = card.querySelector("button");
    button.addEventListener("click", () => {
        pageHandler.handleRenderBookingPage(doctor.full_name);
    });
}