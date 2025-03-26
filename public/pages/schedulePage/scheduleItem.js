import { pageHandler } from "../../pageHandler/pageHandler.js";

export function renderScheduleItem(parentId, scheduleItem){
    const parent = document.querySelector(parentId);

    const item = document.createElement("div");
    item.className = "scheduleItem";
    parent.appendChild(item);

    item.innerHTML =`<div class="scheduleItem">
                        <span>${scheduleItem.start_time}</span>
                        <span>${scheduleItem.end_time}</span>
                        <button>Book</button>
                    </div>`;
    
    const bookButton = item.querySelector("button");

    bookButton.addEventListener("click", () => {
        const timeData = {
            start_time:scheduleItem.start_time,
            end_time: scheduleItem.end_time
        }

        pageHandler.handleSetSchedule(timeData);
    });
}