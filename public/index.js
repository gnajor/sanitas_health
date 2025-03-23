import { pageHandler } from "./pageHandler/pageHandler.js";

export const App = {
    user:{
        loggedIn: null,
        patient: null,
        admin:null,
        idNum: null,
        f_name: null,
        l_name: null,
        phoneNum: null,
        gender: null,
        adress: null,
        birthDate: null,
        regDate: null,
    },


    render(){
        pageHandler.handleHomePageRender();
    },

    setUserData(userData){
        switch(userData.role){
            case "doctor":
                this.user.loggedIn = true;
                this.user.idNum = userData.doctor_num;
                break;

            case "patient":
                this.user.loggedIn = true;
                this.user.patient = true;
                this.user.idNum = userData.medical_num;
                this.user.l_name = userData.lastname;
                this.user.f_name = userData.firstname;
                this.user.phoneNum = userData.phone_num;
                this.user.gender = userData.gender;
                this.user.adress = userData.adress;
                this.user.birthDate = userData.birthDate;
                this.user.regDate = userData.reg_date;
                break;

            case "admin":
                this.user.loggedIn = true;
                this.user.admin = true;
                break;

            default:
                console.error("This userrole does not exist in this database");
                break;
        }

        this.setUserToLocaleStorage();
    },

    setUserToLocaleStorage(){
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

    setUserFromLocaleStorage(){
        sessionStorage.getItem(key, this.user[key]);
    }
}


App.render();

