

const validateMinLength = (text:string, min:number): boolean => {
    text = text.trim();
    return text.length >= min;
}

const validateMaxLength = (text:string, max:number ):boolean => {
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

const validateAtLeastOneUpper = (text:string): boolean => {
    const regex = /[A-Z]/;
    return regex.test(text);
}

const validateNoSpaces = (text:string): boolean =>{
    const regex = /^[^\s]*$/;
    return regex.test(text);
}

const validateOneSpecialCharacter = (text:string): boolean =>{
   const regex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).*$/;
   return regex.test(text);
}

export {validateLength, validateNotEmpty, validateMaxLength, validateMinLength, validateAtLeastOneUpper , validateNoSpaces , validateOneSpecialCharacter};

