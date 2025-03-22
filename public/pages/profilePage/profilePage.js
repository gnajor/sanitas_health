import { renderHeader } from "../../components/header.js";
import { renderProfilePageCard } from "./card.js";

export function renderProfilePage(parentId){
    const parent = document.querySelector(parentId);

    parent.innerHTML = `<div id="profile-page">
                            <header></header>
                            <div id="top-side">
                                <h2>Manage your healthcare with ease — <br> what do you need today?</h2>
                            </div>
                            <div id="cards-container"></div>
                        </div>`;
    renderHeader("header");
                        
    for(const cardData of cardsData){
        renderProfilePageCard("#cards-container", cardData);
    }
}


const cardsData = [
    {
        header: "Booked Appointments",
        text: "Schedule appointments easily by choosing your doctor, selecting a time, and confirming your visit.",
        buttonText: "View Appointments",
        img: "../../media/icons/appointment.svg",
        func: () => {
            //pageHandler
        }
    },
    {
        header: "Journal",
        text: "Securely access your medical history, prescriptions, and past appointments anytime, anywhere",
        buttonText: "Access Journal",
        img: "../../media/icons/journal.svg",
        func: () => {
            //pageHandler
        }
    },
    {
        header: "Edit Your Profile",
        text: "Securely access your medical history, prescriptions, and past appointments anytime, anywhere",
        buttonText: "Edit Profile",
        img: "../../media/icons/edit.svg",
        func: () => {
            //pageHandler
        }
    }
]