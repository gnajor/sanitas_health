import { renderHeader } from "../../components/header.js";
import { renderViewPatientCard } from "./viewPatientCard.js";

export function renderViewPatientPage(parentId, patients, userData){
        const parent = document.querySelector(parentId);
        parent.innerHTML = `<div id="view-patients-page" class="page">
                                <header></header>
                                <div class="cards"></div>
                            </div>`;
    
        renderHeader("header", userData);

        for(const patient of patients){
            renderViewPatientCard(".cards", patient, userData);
        }
}