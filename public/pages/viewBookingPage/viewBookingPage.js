import { renderHeader } from "../../components/header.js";
import { renderBookedCard } from "./bookedCard.js";

export function renderViewBookingPage(parentId, appointments, userData){
        const parent = document.querySelector(parentId);
        parent.innerHTML = `<div id="view-booking-page" class="page">
                                <header></header>
                                <div class="cards"></div>
                            </div>`;
    
        renderHeader("header", userData);

        for(const appointment of appointments){
            renderBookedCard(".cards", appointment, userData);
        }
}