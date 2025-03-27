import { renderHeader } from "../../components/header.js";
import { pageHandler } from "../../pageHandler/pageHandler.js";
import { renderProfilePageCard } from "./card.js";

export function renderProfilePage(parentId, userData){
    const parent = document.querySelector(parentId);

    parent.innerHTML = `<div id="profile-page">
                            <header></header>
                            <div id="top-side">
                                <h2>Manage your healthcare with ease — <br> what do you need today?</h2>
                            </div>
                            <div id="cards-container"></div>
                        </div>`;

    renderHeader("header", userData);
    let data = undefined;
    
    if(userData.patient){
        data = cardsDataPatient;
    }
    else if(userData.admin){
        data = cardsDataAdmin;
    }
    else{
        data = cardsDataDoctor;
        const h2Elem = parent.querySelector("#top-side h2");
        h2Elem.innerHTML = "Manage Your Patients with Ease — <br> What Do You Need?";
    }

    for(const item of data){
        renderProfilePageCard("#cards-container", item);
    }
}


const cardsDataPatient = [
    {
        header: "Booked Appointments",
        text: "Schedule appointments easily by choosing your doctor, selecting a time, and confirming your visit.",
        buttonText: "View Appointments",
        img: "../../media/icons/appointment.svg",
        func: () => {
            pageHandler.handleRenderViewBookingForPatient();
        }
    },
    {
        header: "Journal",
        text: "Securely access your medical history, prescriptions, and past appointments anytime, anywhere",
        buttonText: "Access Journal",
        img: "../../media/icons/journal.svg",
        func: () => {
            pageHandler.handleRenderJournalPage();
        }
    },
    {
        header: "Doctor Directory",
        text: "Browse trusted doctors, check their availability, and book appointments with ease.",
        buttonText: "Find a Doctor",
        img: "../../media/icons/list.svg",
        func: () => {
            pageHandler.handleRenderViewDoctorPage();
        }
    }
];

const cardsDataDoctor  = [
    {
        header: "Booked Appointments",
        text: "Check your upcoming appointments at a glance and stay ahead with your schedule.",
        buttonText: "View Appointments",
        img: "../../media/icons/appointment.svg",
        func: () => {
            pageHandler.handleRenderViewBookingForDoctor();
        }
    },
    {
        header: "View Patients",
        text: "View your patients medical records. Ensure consent is obtained and privacy guidelines are followed.",
        buttonText: "View Patients",
        img: "../../media/icons/journal.svg",
        func: () => {
            pageHandler.handleRenderViewPatients();
        }
    },
    {
        header: "Edit Schedule",
        text: "Modify your available hours or appointment slots smoothly to manage your schedule effectively.",
        buttonText: "Edit Schedule",
        img: "../../media/icons/edit_schedule.svg",
        func: () => {
            pageHandler.handleRenderSchedulePage();
        }
    }
];


const cardsDataAdmin  = [
    {
        header: "Booked Appointments",
        text: "Check every upcoming appointment at a glance and stay ahead with your schedule.",
        buttonText: "View All Appointments",
        img: "../../media/icons/appointment.svg",
        func: () => {
            pageHandler.handleRenderViewBookingForAdmin();
        }
    },
    {
        header: "View Patients",
        text: "View every patient's medical records. Ensure consent is obtained and privacy guidelines are followed.",
        buttonText: "View Patients",
        img: "../../media/icons/journal.svg",
        func: () => {
            pageHandler.handleRenderViewPatientsForAdmin();
        }
    },
    {
        header: "Create Doctor",
        text: "Create a doctor to the system with their details to streamline appointments and patient care.",
        buttonText: "Create Doctor",
        img: "../../media/icons/add.svg",
        func: () => {
            pageHandler.handleRenderCreateDoctorPage();
        }
    },
    {
        header: "Delete Doctor",
        text: "Delete a doctor from the system to keep records up to date and manage active staff efficiently.",
        buttonText: "View Doctors",
        img: "../../media/icons/delete.svg",
        func: () => {
            pageHandler.handleRenderViewDoctorPage();
        }
    }
];

