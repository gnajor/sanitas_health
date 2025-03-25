import { renderHeader } from "../../components/header.js";
import { renderDoctorCard } from "./doctorCard.js";

export function renderViewDoctorsPage(parentId, doctors, userData){
    const parent = document.querySelector(parentId);
    parent.innerHTML = `<div id="view-doctors-page">
                            <header></header>
                            <select>
                                <option value="dentist">Dentist</option>
                                <option value="cardiologist">Cardiologist</option>
                                <option value="psychiatrist">Psychiatrist</option>
                            </select>
                            <div class="cards"></div>
                        </div>`;

    renderHeader("header", userData);
    
    for(const doctor of doctors){
        renderDoctorCard(".cards", doctor);
    }
}