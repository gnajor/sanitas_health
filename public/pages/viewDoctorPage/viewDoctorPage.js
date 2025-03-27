import { renderHeader } from "../../components/header.js";
import { pageHandler } from "../../pageHandler/pageHandler.js";
import { renderDoctorCard } from "./doctorCard.js";

export function renderViewDoctorsPage(parentId, doctors, userData){
    const parent = document.querySelector(parentId);
    parent.innerHTML = `<div id="view-doctors-page" class="page">
                            <header></header>
                            <select>
                                <option value="all">all</option>
                                <option value="Dentist">Dentist</option>
                                <option value="Cardiologist">Cardiologist</option>
                                <option value="Psychiatrist">Psychiatrist</option>
                            </select>
                            <div class="cards"></div>
                        </div>`;

    renderHeader("header", userData);

    const select = parent.querySelector("#view-doctors-page > select");

    select.addEventListener("change", () => {
        pageHandler.handleGetDoctorsBySpec(select.value);
    });

    if(userData.admin){
        select.remove();
    }
    
    for(const doctor of doctors){
        renderDoctorCard(".cards", doctor, userData);
    }
}

export function updateViewDoctorsPage(doctors, userData){
    document.querySelector(".cards").innerHTML = "";

    for(const doctor of doctors){
        renderDoctorCard(".cards", doctor, userData);
    }
}