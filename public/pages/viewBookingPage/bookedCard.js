export function renderBookedCard(parentId, appointment){
    const parent = document.querySelector(parentId);

    const card = document.createElement("div");
    card.className = "card";
    parent.appendChild(card);

    card.innerHTML = `<div class="text-container">
                        <h3>By ${appointment.doctor_name}</h3>
                        <p>${appointment.patient_name}</p>
                        <p>${appointment.booked_on}</p>
                        <p>${appointment.start_time}</p>
                        <p>${appointment.end_time}</p>
                        <p></p>
                    </div>
                    <hr>`;
}