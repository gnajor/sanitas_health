import { apiCom } from "../apiCom/apiCom.js";
import { App } from "../index.js";
import { renderHomePage } from "../pages/homePage/homePage.js";
import { renderBookingPage } from "../pages/patientPages/bookingPage/bookingPage.js";
import { renderJournalPage } from "../pages/journalPage/journalPage.js";
import { renderViewDoctorsPage } from "../pages/patientPages/viewDoctorPage/viewDoctorPage.js";
import { renderProfilePage } from "../pages/profilePage/profilePage.js";
import { renderRegisterPage } from "../pages/registerPage/registerPage.js";
import { renderViewBookingPage } from "../pages/viewBookingPage/viewBookingPage.js";
import { renderViewPatientPage } from "../pages/viewPatientsPage/viewPatientPage.js";

export const pageHandler = {
    parentId: "#wrapper",

    handleHomePageRender(){
        App.setLastPageVisitedSessionStorage("homePage");
        renderHomePage(this.parentId);
    },

    handleProfilePageRender(){
        App.setLastPageVisitedSessionStorage("profilePage");
        renderProfilePage(this.parentId, App.getCurrentUserData());
    },

    handleRegisterPageRender(){
        App.setLastPageVisitedSessionStorage("registerPage");
        renderRegisterPage(this.parentId);
    },

    async handleLogin(digit){
        if(digit === "admin"){
            App.setUserData({
                role: "admin"
            });
        }
        else{
            const resource = await apiCom("login", {
                id_num: digit
            });

            if(resource){
                App.setUserData(resource.dbData);
                this.handleProfilePageRender();
            }
        }
    },

    async handleProfileChange(dataChange){
        const changedData = App.getChangedData(dataChange);

        const isUpdated = await apiCom("editProfile", changedData); 

        if(isUpdated){
            App.setChangedData(changedData);
            App.setUserToSessionStorage();
        }
    },

    async handleRenderViewDoctorPage(){
        const data = await apiCom("getDoctor", "all");

        if(data){
            renderViewDoctorsPage(this.parentId, data.dbData, App.getCurrentUserData());
        }
    },

    async handleRenderBookingPage(docName){
        const data = await apiCom("getDoctorAvailability", docName);

        if(data){
            renderBookingPage(this.parentId, data.dbData, docName, App.getCurrentUserData());
        }
    },

    async handleBooking(){
        
    },

    async handleRenderJournalPageFor(){
        const data = await apiCom("getJournals", App.id_num)

        if(data){
            renderJournalPage(this.parentId, data.dbData, App.getCurrentUserData());
        }
    },

    async handleRenderViewBookingForPatient(){
        const data = await apiCom("getBooked", App.user.id_num);

        if(data){
            renderViewBookingPage(this.parentId, data.dbData, App.getCurrentUserData());
        }
    },

    async handleRenderViewBookingForDoctor(){
        const data = await apiCom("getBooked", App.user.id_num); 

        if(data){
            renderViewBookingPage(this.parentId, data.dbData, App.getCurrentUserData());
        }
    },

    async handleRenderViewPatients(){
        const data = await apiCom("getPatiententsAndRecordByDoctorId", App.user.id_num);

        if(data){
            renderViewPatientPage(this.parentId, data.dbData, App.getCurrentUserData());
        }
    },

    handleLogout(){
        App.resetSessionStorage();
        App.resetUser();
        this.handleHomePageRender();
    }
} 