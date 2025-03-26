function getRandomInt(max){
    return Math.floor(Math.random() * max);
}

export function generateNumberCombination(num){
    let medical_num = "";

    for(let i = 0; i < num; i++){
        const number = getRandomInt(9);
        medical_num += number; 
    }

    return medical_num;
}