import { pageHandler } from "./pageHandler/pageHandler.js";

export const App = {
    user:{
        logged_in: null,
        patient: null,
        admin:null,
        id_num: null,
        firstname: null,
        lastname: null,
        phone_num: null,
        gender: null,
        address: null,
        birthdate: null,
        reg_date: null,
    },


    render(){
        if(sessionStorage.getItem("logged_in")){
            this.setUserFromSessionStorage();
        }

        if(sessionStorage.getItem("lastVisited")){
            switch(sessionStorage.getItem("lastVisited")){
                case "homePage":
                    pageHandler.handleHomePageRender();
                    break;
                
                case "registerPage":
                    pageHandler.handleRegisterPageRender();
                    break;
                
                case "profilePage":
                    pageHandler.handleProfilePageRender();
                    break;

                default:
                    console.error("Pagename does not exist");
                    break;
            }
        }
        else{
            pageHandler.handleHomePageRender();
        }
    },

    setUserData(userData){
        switch(userData.role){
            case "doctor":
                this.user.logged_in = true;
                this.user.id_num = userData.employee_num;
                this.user.firstname = userData.full_name.split(" ")[0];
                this.user.lastname = userData.full_name.split(" ")[1];
                this.user.phone_num = userData.phone_num;
                break;

            case "patient":
                this.user.logged_in = true;
                this.user.patient = true;
                this.user.id_num = userData.medical_num;
                this.user.lastname = userData.lastname;
                this.user.firstname = userData.firstname;
                this.user.phone_num = userData.phone_num;
                this.user.gender = userData.gender;
                this.user.address = userData.address;
                this.user.birthdate = userData.birthdate;
                this.user.reg_date = userData.reg_date;
                break;

            case "admin":
                this.user.logged_in = true;
                this.user.firstname = "Mr."
                this.user.lastname = "admin"
                this.user.admin = true;
                break;

            default:
                console.error("This userrole does not exist in this database");
                break;
        }

        this.setUserToSessionStorage();
    },

    setUserToSessionStorage(){
        for(const key in this.user){
            if(this.user[key] !== null){
                sessionStorage.setItem(key, this.user[key]);
            }
        }
    },

    resetUser(){
        for(const key in this.user){
            if(this.user[key] !== null){
                this.user[key] = null;
            }
        }
    },

    resetSessionStorage(){
        sessionStorage.clear();
    },

    getCurrentUserData(){
        const userData = {};
        for(const key in this.user){
            if(this.user[key] !== null){
                userData[key] = this.user[key];
            }
        }

        return userData;
    },

    setUserFromSessionStorage(){
        for(const key in this.user){
            if(sessionStorage.getItem(key)){
                this.user[key] = sessionStorage.getItem(key);
            }
        }
    },

    setLastPageVisitedSessionStorage(pageName){
        sessionStorage.setItem("lastVisited", pageName);
    },
    
    getChangedData(changedData){
        const saveChangedData = {}


        //does not work you monkey

        for(const dataChangeKey in changedData){
            saveChangedData[dataChangeKey] = changedData[dataChangeKey];

            for(const key in this.user){
                if(changedData[dataChangeKey] === this.user[key]){
                    delete saveChangedData[dataChangeKey];
                }
            }
        }
        return saveChangedData;
    },

    setChangedData(changedData){
        for(const dataChangeKey in changedData){
            for(const key in this.user){
                if(dataChangeKey === key){
                    this.user[key] = changedData[dataChangeKey]; 
                }
            }
        }
    },
}


App.render();

