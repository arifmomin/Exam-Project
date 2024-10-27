const emailPettern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,16})/;

const isemailValid = (email = 'arifmominweb@gmail.com') =>{
    return emailPettern.test(email.toLowerCase());
};
const isfullNameValid = (fullName = 'Arif Momin') =>{
    if(fullName.length >= 5 && fullName.length <= 20){
        return true;
    }else{
        return false;
    }
}
const isPasswordValid = (Password) =>{
    return passwordPattern.test(Password);
}

export {isemailValid, isfullNameValid, isPasswordValid};