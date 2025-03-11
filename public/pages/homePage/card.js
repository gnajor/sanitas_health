export function renderHomePageCard(parentId, data){
    const parent = document.querySelector(parentId);
    parent.innerHTML = `<div id="card">
                            <div class="line"></div>
                            <div class="text-container">
                                <h2>${data.header}</h2>
                                <p>${data.text}</p>
                                <a class="card-link">
                                    <span>${data.link}</span>
                                    <img src="icon"></img>
                                </a>
                            </div>
                            <img src="${data.img}">
                        </div>`;

    const cardLink = parent.querySelector(".card-link");

    cardLink.addEventListener("click", data.func);
}