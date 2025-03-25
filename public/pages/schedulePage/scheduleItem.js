export function renderScheduleItem(parentId, scheduleItem){
    const parent = document.querySelector(parentId);

    const item = document.createElement("div");
    item.className = "scheduleItem";
    parent.appendChild(item);

    item.innerHTML =`<div class="scheduleItem">
                        <span>${scheduleItem.start_time}</span>
                        <span>${scheduleItem.end_time}</span>
                        <button>Book</button>
                    </div>
                    <hr>`;
    
    const bookButton = item.querySelector("button");

    bookButton.addEventListener("click", () => {

    });
}