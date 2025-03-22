export function renderProfilePageCard(parentId, data){
    const parent = document.querySelector(parentId);

    parent.innerHTML += `<div class="card">
                            <img src="${data.img}">
                            <div class="text-container">
                                <h3>${data.header}</h3>
                                <p>${data.text}</p>
                            </div>
                            <button>${data.buttonText}</button>
                        </div>`;
    
    const button = parent.querySelector("button");
    button.addEventListener("click", data.func);
}