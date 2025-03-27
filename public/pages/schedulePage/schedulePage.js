import { renderHeader } from "../../components/header.js";
import { renderScheduleItem } from "./scheduleItem.js";

export function renderSchedulePage(parentId, scheduleItems, userData){
    const parent = document.querySelector(parentId);

    parent.innerHTML = `<div id="schedule-page" class="page">
                            <header></header>
                            <div class="cards-container">
                                <div class="monday">
                                    <h3>Monday<h3>
                                </div>
                                <div class="tuesday">
                                    <h3>Tuesday<h3>
                                </div>
                                <div class="wednesday">
                                    <h3>Wednesday<h3>
                                </div>
                                <div class="thursday">
                                    <h3>Thursday<h3>
                                </div>
                                <div class="friday">
                                    <h3>Friday<h3>
                                </div>
                            </div>
                        </div>`;

    renderHeader("header", userData);
    console.log(scheduleItems)

    let parentCounter = 0;
    const weekdays = parent.querySelectorAll(".cards-container > div");

    for(let i = 0; i < scheduleItems.length; i++){
        const scheduleItem = scheduleItems[i];

        if(i%4 === 0 && i !== 0){
            parentCounter++;
        }

        renderScheduleItem("." + weekdays[parentCounter].className, scheduleItem);
    }
}

