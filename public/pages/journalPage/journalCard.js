export function renderJournalCard(parentId, journal){
    const parent = document.querySelector(parentId);

    const card = document.createElement("div");
    card.className = "card";
    parent.appendChild(card);

    card.innerHTML = `<div class="text-container">
                        <h3>By ${journal.full_name}</h3>
                        <p>${journal.diagnosis}</p>
                        <p>${journal.prescription}</p>
                    </div>
                    <hr>`;
}