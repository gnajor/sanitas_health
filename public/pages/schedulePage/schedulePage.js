import { renderHeader } from "../../components/header.js";
import { renderScheduleItem } from "./scheduleItem.js";

export function renderSchedulePage(parentId, scheduleItems, userData){
    const parent = document.querySelector(parentId);

    parent.innerHTML = `<div id="schedule-page">
                            <header></header>
                            <div class="cards-container"></div>
                        </div>`;

    renderHeader("header", userData);

    for(const scheduleItem of scheduleItems){
        renderScheduleItem(".cards-container", scheduleItem);
    }
}

//9 - 9.30
//9.30 - 10
//10.00 - 10.30
//10.30 - 11
