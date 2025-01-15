

const validateMinLength = (text:string, min:number): boolen => {
    text = text.trim();
    return text.length >= min;
}

const validateMaxLength = (text:string, max:number ):boolen => {
    text = text.trim();
    return text.length<= max;
}

const validateLength = (text:string, min:number ,max: number): boolean => {
    
    text = text.trim();
    return text.length >= min && text.length <= max;

}

const validateNotEmpty = (text:string): boolean => {

    text = text.trim();
    return text !== ""; 
}

const replaceSpaces = (text:string): st

//validates if password can be sent mainly to 
const validatePassword = (text: string): boolean => {
    text = text.trim(); // Trim and assign back to the text

    if (!validateNotEmpty(text)) return false; // Check if text is not empty
    if (!validateLength(text, 8, 32)) return false; // Validate length between 8 and 32

    // Regex to check at least one uppercase letter and one special character
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/;
    
    return regex.test(text); // Validate using regex
}

export {validateLength, validateNotEmpty, validatePassword, validateMaxLength, validateMinLength};

