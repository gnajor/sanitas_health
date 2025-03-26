import { renderHeader } from "../../components/header.js";
import { renderScheduleItem } from "./scheduleItem.js";

export function renderSchedulePage(parentId, scheduleItems, userData){
    const parent = document.querySelector(parentId);

    parent.innerHTML = `<div id="schedule-page" class="page">
                            <header></header>
                            <div class="cards-container"></div>
                        </div>`;

    renderHeader("header", userData);

    for(const scheduleItem of scheduleItems){
        renderScheduleItem(".cards-container", scheduleItem);
    }
}

