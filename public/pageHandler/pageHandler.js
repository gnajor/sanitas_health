import { apiCom } from "../apiCom/apiCom.js";
import { App } from "../index.js";
import { renderHomePage } from "../pages/homePage/homePage.js";
import { renderProfilePage } from "../pages/profilePage/profilePage.js";
import { renderRegisterPage } from "../pages/registerPage/registerPage.js";

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

        console.log(changedData);

        App.setChangedData(changedData);
        apiCom("edit-profile", changedData);
    }
} 