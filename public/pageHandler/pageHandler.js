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
    }

} 