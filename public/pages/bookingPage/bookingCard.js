import { pageHandler } from "../../pageHandler/pageHandler.js";

export function renderBookingCard(parentId, appointment, userData){
    const parent = document.querySelector(parentId);

    const card = document.createElement("div");
    card.className = "card";
    parent.appendChild(card);

    card.innerHTML = `<div class="text-container">
                        <h3>${appointment.date.slice(0, 10)}</h3>
                        <p>${appointment.start_time} - ${appointment.end_time}</p>
                    </div>
                    <button>Book Now</button>
                    <hr>`;
    
    const button = card.querySelector("button");
    button.addEventListener("click", () => {
        const date = new Date();
        const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');

        const bookingData = {
            patient_num: userData.id_num,
            doctor_num: appointment.employee_num,
            booked_on: formattedDate,
            start_time: `${appointment.date}T${appointment.start_time}`,
            end_time: `${appointment.date}T${appointment.end_time}`
        }

        pageHandler.handleBooking(bookingData);
    });
}