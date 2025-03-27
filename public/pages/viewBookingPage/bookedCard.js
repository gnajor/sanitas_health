export function renderBookedCard(parentId, appointment, userData){
    const parent = document.querySelector(parentId);

    const card = document.createElement("div");
    card.className = "card";
    parent.appendChild(card);

    card.innerHTML = `<div class="text-container">
                        <h3>Patient: ${appointment.firstname + " " + appointment.lastname}</h3>
                        <p>Booked on: ${appointment.booked_on}</p>
                        <p>Appointment start: ${appointment.start_time}</p>
                        <p>Appointment end: ${appointment.end_time}</p>
                    </div>
                    <hr>`;

    if(userData.admin){
        const textContainer = card.querySelector(".text-container");
        textContainer.innerHTML += `<p>Doctor: ${appointment.full_name}</p>`;
    }
}