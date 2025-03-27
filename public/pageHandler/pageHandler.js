import { apiCom } from "../apiCom/apiCom.js";
import { App } from "../index.js";
import { renderHomePage } from "../pages/homePage/homePage.js";
import { renderBookingPage } from "../pages/bookingPage/bookingPage.js";
import { renderJournalPage } from "../pages/journalPage/journalPage.js";
import { renderViewDoctorsPage, updateViewDoctorsPage } from "../pages/viewDoctorPage/viewDoctorPage.js";
import { renderProfilePage } from "../pages/profilePage/profilePage.js";
import { renderRegisterPage } from "../pages/registerPage/registerPage.js";
import { renderViewBookingPage } from "../pages/viewBookingPage/viewBookingPage.js";
import { renderViewPatientPage } from "../pages/viewPatientsPage/viewPatientPage.js";
import { renderSchedulePage } from "../pages/schedulePage/schedulePage.js";
import { renderCreateDoctorPage } from "../pages/createDoctorPage/createDoctorPage.js";

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

            this.handleProfilePageRender(this.parentId, App.getCurrentUserData());
        }
        else{
            const resource = await apiCom("login", {
                id_num: digit
            });

            console.log(resource)

            if(resource){
                App.setUserData(resource);
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
            this.handleProfilePageRender();
        }
    },

    async handleRenderViewDoctorPage(){
        const data = await apiCom("getDoctor", "all");

        if(data){
            renderViewDoctorsPage(this.parentId, data, App.getCurrentUserData());
        }
    },

    async handleRenderBookingPage(docId){
        const data = await apiCom("getDoctorAvailability", docId);

        if(data){
            renderBookingPage(this.parentId, data, App.getCurrentUserData());
        }
    },

    async handleBooking(bookingData){
        const data = await apiCom("bookAppointment", bookingData);

        console.log(data);

        if(data){
            
        }
    },

    async handleRenderJournalPage(){
        const data = await apiCom("getPatientJournals", App.id_num);

        console.log(data);

        if(data){
            renderJournalPage(this.parentId, data, App.getCurrentUserData());
        }
    },

    async handleRenderViewBookingForPatient(){
        const data = await apiCom("getBooked", App.user.id_num);

        console.log(data)

        if(data){
            renderViewBookingPage(this.parentId, data, App.getCurrentUserData());
        }
    },

    async handleRenderViewBookingForDoctor(){
        const data = await apiCom("getBooked", App.user.id_num); 

        if(data){
            renderViewBookingPage(this.parentId, data, App.getCurrentUserData());
        }
    },

    async handleRenderViewBookingForAdmin(){
        const data = await apiCom("getBooked", "all");

        if(data){
            renderViewBookingPage(this.parentId, data, App.getCurrentUserData());
        }
    },

    async handleRenderViewPatients(){
        const data = await apiCom("getPatiententsAndRecordByDoctorId", App.user.id_num);

        if(data){
            renderViewPatientPage(this.parentId, data, App.getCurrentUserData());
        }
    },

    async handleRenderViewPatientsForAdmin(){
        const data = await apiCom("getPatientsAndRecord", "all");

        if(data){
            renderViewPatientPage(this.parentId, data.dbData, App.getCurrentUserData());
        }
    },

    async handleRenderSchedulePage(){
        const data = await apiCom("getSchedule", App.user.id_num);

        if(data){
            renderSchedulePage(this.parentId, data, App.getCurrentUserData());
        }
    },

    async handleRegisterPatient(userData){
        const data = await apiCom("register", userData);
        
        if(data){
            App.setUserData(data.dbData);
            this.handleProfilePageRender(this.parentId, App.getCurrentUserData());
        }
    },

    handleRenderCreateDoctorPage(){
        renderCreateDoctorPage(this.parentId, App.getCurrentUserData());
    },

    async handleGetDoctorsBySpec(spec){
        const data = await apiCom("getDoctor", spec);

        console.log(data);

        if(data){
            updateViewDoctorsPage(data, App.getCurrentUserData());
        }
    },

    async handleCreateDoctor(doctorInfo){
        const data = await apiCom("createDoctor", doctorInfo);
        console.log(data);

        if(data){
            this.handleProfilePageRender(this.parentId, App.getCurrentUserData());
        }
    },

    async handleSetSchedule(bookingInfo){
        const data = await apiCom("setSchedule", bookingInfo);
    },

    async handleDeleteDoctor(doctorInfo){
        console.log(doctorInfo)

        const data = await apiCom("deleteDoctor", doctorInfo);

        console.log(data);
    },

    async handleCreateMedicalRecord(changedData){
        const data = await apiCom("createMedicalRecord", changedData);

        if(data){
            this.handleProfilePageRender(this.parentId, App.getCurrentUserData());
        }
    },
    

    handleLogout(){
        App.resetSessionStorage();
        App.resetUser();
        this.handleHomePageRender();
    }
} 