import { renderHeader } from "../../components/header.js";
import { renderJournalCard } from "./journalCard.js";

export function renderJournalPage(parentId, journals, userData){
    const parent = document.querySelector(parentId);
    parent.innerHTML = `<div id="journal-page">
                            <header></header>
                            <div class="cards"></div>
                        </div>`;

    renderHeader("header", userData);

    
    for(const journal of journals){
        renderJournalCard(".cards", journal);
    }
}