export function renderProfilePageCard(parentId, data){
    const parent = document.querySelector(parentId);

    const card = document.createElement("div");
    card.className = "card";
    parent.appendChild(card);

    card.innerHTML = `  <img src="${data.img}">
                        <div class="text-container">
                            <h3>${data.header}</h3>
                            <p>${data.text}</p>
                        </div>
                        <button class="card-button">${data.buttonText}</button>`;
    
    const button = card.querySelector(".card-button");
    button.addEventListener("click", data.func)
}