// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]; 
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]; 
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:

// sum digits according to Linh algorithm rule

const linhSum = cardNumberArray => {
    // sum of even digits in card number, according to algorithm 
    const evenNumbersSum = array => {
        let sum = 0;
        for (let i = array.length - 2; i >= 0; i -= 2) {
            let newVal = array[i] * 2;
            if (newVal > 9) {
                let stringNumber = newVal.toString();
                sum += parseInt(stringNumber[0]) + parseInt(stringNumber[1]);
            } else {
                sum += newVal;
            }
        }
        return sum;
    }
    // sum of odd digits in card number, according to algorithm  
    const oddNumbersSum = array => {
        let sum = 0;
        for (let i = array.length - 1; i >= 0; i -= 2) {
            sum += array[i];
        }
        return sum;
    }

    return evenNumbersSum(cardNumberArray) + oddNumbersSum(cardNumberArray);

}

// function checking card number according to Linh algorithm
const validateCred = cardNumberArray => {
    // checking if card's length valid
    return (linhSum(cardNumberArray) % 10 === 0);
}

// function deletes duplicates in array
const deleteDuplicates = array => {
    let newArray = array;
    
    for (let i = 0; i < newArray.length; i++) {
        for (let j = i + 1; j < newArray.length; j++) {
            if (newArray[j] === newArray[i]) {
                newArray[j] = '';
            }
        }
    }

    newArray = newArray.filter((element) => element !== '');
    
    return newArray;
}

// function creates array of cards, that did not pass Linh algorithm test
const findInvalidCards = (arrayOfCards) => {
    let arrayOfInvalids = [];
    for(let i = 0; i < arrayOfCards.length; i++) {
        if (!validateCred(arrayOfCards[i])) {
            arrayOfInvalids.push(arrayOfCards[i]);
        }
    }
    return arrayOfInvalids;
}

// function that gathers all companies, that produced cards from input array based on a first digit
const idCardCompanies = CardsArray => {
    let companies = [];

    const checkCompany = firstNumber => {
        switch(firstNumber) {
            case 3: return 'Amex (American Express)';
            case 4: return 'Visa';
            case 5: return 'Mastercard';
            case 6: return 'Discover';
            default: return 'Company not found!'
        }
    }

    for (let i = 0; i < CardsArray.length; i++) {
        companies.push(checkCompany(CardsArray[i][0]))
    }

    return deleteDuplicates(companies);
}

// function, that displays companies that produced invalid cards(main task of a challenge)
const idInvalidCardCompanies = () => {
    return idCardCompanies(findInvalidCards(batch));
}

console.log(idInvalidCardCompanies(batch))

// To make it easier to test credit card numbers, create a function that accepts a string and converts it into an array of numbers like the initially provided arrays.

const cardOne = '4567324195047382';

const stringToArray = cardNumberString => {
    let cardArray = [];
    
    for(let i = 0; i < cardNumberString.length; i++) {
        cardArray.push(parseInt(cardNumberString[i]));
    }

    return cardArray;
}

// Create a function that will convert invalid numbers into valid numbers.

const makeValid = cardNumberArray => {
    if (!validateCred(cardNumberArray)) {    
        console.log(`Invalid number: ${cardNumberArray}`);
        let first15 = linhSum(cardNumberArray) - cardNumberArray[cardNumberArray.length - 1];
        for (let i = 0; i < 10; i++) {
            if ((first15 + i) % 10) {
                cardNumberArray[cardNumberArray.length - 1] = i;
                break;
            }
        }
        return cardNumberArray;    
    } else {
        return 'Card number is valid';
    }
}

console.log(makeValid(invalid1));
