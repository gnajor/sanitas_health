import { pageHandler } from "../../pageHandler/pageHandler.js";

export function renderBookingCard(parentId, appointment){
    const parent = document.querySelector(parentId);

    const card = document.createElement("div");
    card.className = "card";
    parent.appendChild(card);

    card.innerHTML = `<div class="text-container">
                        <h3>${appointment.date}</h3>
                        <p>${appointment.start_time} - ${appointment.end_time}</p>
                    </div>
                    <button>Book Now</button>
                    <hr>`;
    
    const button = parent.querySelector("button");
    button.addEventListener("click", () => {
       
    });
}