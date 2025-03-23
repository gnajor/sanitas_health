import { apiCom } from "../apiCom/apiCom.js";
import { App } from "../index.js";
import { renderHomePage } from "../pages/homePage/homePage.js";
import { renderProfilePage } from "../pages/profilePage/profilePage.js";
import { renderRegisterPage } from "../pages/registerPage/registerPage.js";

export const pageHandler = {
    parentId: "#wrapper",

    handleHomePageRender(){
        renderHomePage(this.parentId);
    },

    handleProfilePageRender(){
        renderProfilePage(this.parentId);
    },

    handleRegisterPageRender(){
        renderRegisterPage(this.parentId);
    },

    handleLogin(digit){
        if(digit === "admin"){
            App.setUserData({
                role: "admin"
            });
        }
        else{
            const resource = apiCom("login", {
                idNum: digit
            });

            App.setUserData(resource);
        }
    }

} 