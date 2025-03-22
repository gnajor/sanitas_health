import { renderHeader } from "../../components/header.js";
import { pageHandler } from "../../pageHandler/pageHandler.js";
import { renderHomePageCard } from "./card.js";

export function renderHomePage(parentId){
    const parent = document.querySelector(parentId);

    parent.innerHTML = `<div id="home-page">
                            <header></header>
                            <main>
                                <div id="image-container">
                                    <div id="content">
                                        <h1>Your Health,<br> Our Priority </h1>
                                        <h3>Your well-being is at the heart of everything we do, ensuring expert care with a human touch</h3>
                                        <button>
                                            <span>Become a patient</span>
                                            <img id="arrow-icon" src="../../media/icons/arrow.svg">
                                        </button>
                                    </div>
                                </div>
                                <div id="cards-container"></div>
                            </main>
                        </div>`;

    const header = parent.querySelector("header");
    const button = parent.querySelector("button");
    renderHeader("header");

    button.addEventListener("click", (event) => {
        pageHandler.handleRegisterPageRender();
    });

    for(const cardData of cardsData){
        renderHomePageCard("#cards-container", cardData);
    }
}


const cardsData = [
    {
        header: "Find the Right Doctor with Ease",
        text: "Our search function lets you quickly find a doctor by specialty, location, and availability. Simply filter through our network to discover the right healthcare professional for your needs, making it easier than ever to get the care you deserve.",
        link: "Find a Doctor",
        img: "../../media/images/doctors.png",
        func: () => {
            //pageHandler
        }
    },
    {
        header: "Hassle-Free Appointment Booking",
        text: "Booking an appointment is simple and fast. Choose your doctor, pick a convenient time, and confirm your visit with just a few clicks. Our user-friendly system ensures you can schedule your healthcare without the hassle.",
        link: "Make an Appointment",
        img: "../../media/images/computer.png",
        func: () => {
            //pageHandler
        }
    },
    {
        header: "Easy & Secure Records Access",
        text: "Access your medical records anytime, anywhere, with our secure system. View past appointments, treatments, and prescriptions, all in one place, ensuring that your health information is always accessible and private.",
        link: "View My Records",
        img: "../../media/images/equipment.png",
        func: () => {
            //pageHandler
        }
    }
]


