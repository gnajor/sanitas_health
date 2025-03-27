import { renderHeader } from "../../components/header.js";
import { renderBookingCard } from "./bookingCard.js";

export function renderBookingPage(parentId, appointments, userData){
    const parent = document.querySelector(parentId);
    parent.innerHTML = `<div id="booking-page" class="page">
                            <header></header>
                            <h2>${appointments[0].full_name}</h2>
                            <hr>
                            <div class="cards"></div>
                        </div>`;

    renderHeader("header", userData);
    
    for(const appointment of appointments){
        renderBookingCard(".cards", appointment, userData);
    }
}