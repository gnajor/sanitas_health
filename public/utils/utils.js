function getRandomInt(max){
    return Math.floor(Math.random() * max);
}

export function generateMedicalNumber(){
    let medical_num = "";

    for(let i = 0; i < 9; i++){
        const number = getRandomInt(9);
        medical_num += number; 
    }

    return medical_num;
}