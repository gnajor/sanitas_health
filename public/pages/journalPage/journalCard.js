export function renderJournalCard(parentId, journal){
    const parent = document.querySelector(parentId);

    const card = document.createElement("div");
    card.className = "card";
    parent.appendChild(card);

    card.innerHTML = `<div class="text-container">
                        <h3>By ${journal.doctor_name}</h3>
                        <p>${journal.diagnosis}</p>
                        <p>${journal.prescription}</p>
                        <p>${journal.description}</p>
                        <p>${journal.patient_name}<p>
                    </div>
                    <hr>`;

    parent.querySelectorAll("p").forEach(element => {
        if(element.textContent === "undefined"){
            element.remove();
        }
    });
}