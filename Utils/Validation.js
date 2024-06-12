const pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

export function EmailValidator(eamil){
    const lowerCaseEmail = eamil.toLowerCase()
    return  pattern.test(lowerCaseEmail)
}

export function fullNameValidator (fullName){
    if(fullName.length >= 2 && fullName.length <20 ) {
        return true
    }else{
        return false
    }
}

export function PasswordValidator (password){
    
    return  passwordPattern.test(password)
}
