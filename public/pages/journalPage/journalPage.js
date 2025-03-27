import { renderHeader } from "../../components/header.js";
import { renderJournalCard } from "./journalCard.js";

export function renderJournalPage(parentId, journals, userData){
    const parent = document.querySelector(parentId);
    parent.innerHTML = `<div id="journal-page" class="page">
                            <header></header>
                            <div class="cards"></div>
                        </div>`;

    renderHeader("header", userData);

    if(journals.length === 0){
        parent.querySelector(".cards").innerHTML = "<h2>No upcoming appointments</h2>"
    }

    for(const journal of journals){
        renderJournalCard(".cards", journal);
    }
}