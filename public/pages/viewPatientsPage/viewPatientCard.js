export function renderViewPatientCard(parentId, patient, userData){
    const parent = document.querySelector(parentId);

    const card = document.createElement("div");
    card.className = "card";
    parent.appendChild(card);

    card.innerHTML = `<div class="text-container">
                        <h3>${patient.full_name}</h3>
                        <p>${patient.gender}</p>
                        <p>${patient.adress}</p>
                        <p>${patient.phone_num}</p>
                        <div class="medical-record">
                            <h3>Medical Record</h3>
                            <p>${patient.diagnosis}</p>
                            <p>${patient.description}</p>
                            <p>${patient.prescription}</p>
                        </div>
                    </div>
                    <hr>`;

    if(!patient.diagnosis && !userData.admin){        
        card.querySelector(".medical-record").remove();
        
        const createButton = document.createElement("button");
        const textContainer = card.querySelector(".text-container");

        createButton.textContent = "Create Medical Record";
        createButton.id = "create-medical-record";
        textContainer.appendChild(createButton);

        createButton.addEventListener("click", () => {
            textContainer.innerHTML += `<div class="description">
                                            <p>Description</p>
                                            <textarea></textarea>
                                        </div>
                                        <div class="diagnosis">
                                            <p>Diagnosis</p>
                                            <textarea></textarea>
                                        </div>
                                        <div class="prescription">
                                            <p>Prescription</p>
                                            <textarea></textarea>
                                        </div>
                                        <button id="submit">Submit</button>`;
            createButton.remove();

            const submitButton = card.querySelector("#submit");
            const descriptionText = card.querySelector(".description textarea");
            const diagnosisText = card.querySelector(".diagnosis textarea");
            const prescriptionText = card.querySelector(".prescription textarea");
    
            submitButton.addEventListener("click", () => {
                const changedData = {
                    description: descriptionText.value,
                    diagnosis: diagnosisText.value,
                    prescription: prescriptionText.value
                }
    
                textContainer.innerHTML = `<div class="medical-record">
                                                <h3>Medical Record</h3>
                                                <p>${changedData.description}</p>
                                                <p>${changedData.diagnosis}</p>
                                                <p>${changedData.prescription}</p>
                                            </div>`;
            }, {once: true});
        }, {once: true}); 
    }
}