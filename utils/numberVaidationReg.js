const REGEX = new RegExp("^[0-9]*$");

const acceptNumberOnly = (userInput) => REGEX.test(userInput);



export default acceptNumberOnly