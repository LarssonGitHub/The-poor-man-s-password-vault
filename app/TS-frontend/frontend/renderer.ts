import {
    API,
    userCredentialsArray
} from "../../@types/@type-module";
import {
    listDataContainer,
    template,
    feedbackMessage,
    feedbackContainer,
} from "./listeners.js";
import {
    viewElement,
    hideElement
} from "./utilities.js";

console.log(`This app is using Chrome (v${window.API.processVersion.chrome()}), Node.js (v${window.API.processVersion.node()}), and Electron (v${window.API.processVersion.electron()})`);

declare global {
    interface Window {
        API: API;
    }
}

export const removeListData = () => {
    while (listDataContainer.firstChild) {
        listDataContainer.removeChild(listDataContainer.firstChild);
    }
}

export const appendListToArrayTemplate = (userCredentials: userCredentialsArray | void): void => {
    if (!userCredentials || typeof userCredentials !== 'object') return;
    const clone = template.content.cloneNode(true) as DocumentFragment;
    const listElement = clone.getElementById("list-data-unordered-list") as HTMLUListElement;
    userCredentials.forEach((credential) => {
        let newClone = listElement.cloneNode(true) as DocumentFragment;
        // Used to easily grab the values when making a put request
        newClone.querySelector(".list-id") !.textContent = credential.id;
        newClone.querySelector(".list-website") !.textContent = credential.websiteInput;
        newClone.querySelector(".list-username") !.textContent = credential.emailInput;
        newClone.querySelector(".list-email") !.textContent = credential.usernameInput;
        newClone.querySelector(".list-password") !.textContent = credential.passwordInput;
        newClone.querySelector(".list-additional-data") !.textContent = credential.additionalDataInput;
        // Used to easily grab the values when making a put request
        (newClone.querySelector(".edit-item-button") as HTMLElement).setAttribute("data-stored-object", JSON.stringify(credential));
        (newClone.querySelector(".delete-item-button") as HTMLElement).setAttribute("data-credential-id", credential.id);
        listDataContainer.append(newClone);
    });

};

export const editDocumentListing = (data: userCredentialsArray) => {
    removeListData()
    appendListToArrayTemplate(data);
}

export const FeedbackResponseType = (error: boolean): void => {
    feedbackContainer.classList.replace("error-container", "success-container")
    if (error) feedbackContainer.classList.replace("success-container", "error-container")
}

export const editDocumentFeedback = (message: string, error: boolean): void => {
    FeedbackResponseType(error)
    feedbackMessage.innerText = message;
    viewElement(feedbackContainer)
}

export const hideFeedbackContainer = (): void => {
    hideElement(feedbackContainer)
}

// TODO
document.onreadystatechange = async function () {
    // let key = prompt("Key needed", "");

    // if (person == null || person == "") {
    //   text = "User cancelled the prompt.";
    // } else {
    //   text = "Hello " + person + "! How are you today?";
    // }
  };