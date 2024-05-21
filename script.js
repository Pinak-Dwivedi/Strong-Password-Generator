const componentForm = document.querySelector("[data-password-components-form]");
const passwordElement = document.querySelector("[data-password]");
const passwordLengthRange = document.querySelector(
  "[data-password-length-range]"
);
const passwordLengthNumber = document.querySelector(
  "[data-password-length-number]"
);
const passwordUppercase = document.querySelector("[data-password-uppercase]");
const passwordLowercase = document.querySelector("[data-password-lowercase]");
const passwordNumbers = document.querySelector("[data-password-numbers]");
const passwordSpecialCharacters = document.querySelector(
  "[data-password-special-characters]"
);

const UPPERCASE_CODES = generateCodesArray(65, 90);
const LOWERCASE_CODES = generateCodesArray(97, 122);
const NUMBER_CODES = generateCodesArray(48, 57);
const SPECIAL_CHARACTER_CODES = [
  ...generateCodesArray(33, 47),
  ...generateCodesArray(58, 64),
  ...generateCodesArray(91, 96),
  ...generateCodesArray(123, 126),
];

passwordLengthNumber.addEventListener("input", handlePasswordLength);
passwordLengthRange.addEventListener("input", handlePasswordLength);

function handlePasswordLength(e) {
  passwordLengthNumber.value = e.target.value;
  passwordLengthRange.value = e.target.value;
}

function generateCodesArray(start, end) {
  const result = [];

  for (let i = start; i <= end; i++) {
    result.push(i);
  }

  return result;
}

generateStrongPassword(false, true, true, false, 15);

componentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const includeUpperCase = passwordUppercase.checked;
  const includeLowerCase = passwordLowercase.checked;
  const includeNumbers = passwordNumbers.checked;
  const includeSpecialCharacters = passwordSpecialCharacters.checked;

  let passwordSize = parseInt(passwordLengthNumber.value);

  if (!passwordSize || passwordSize <= 0) {
    passwordLengthNumber.value = 15;
    passwordLengthRange.value = 15;
    passwordSize = 15;
  } else if (passwordSize > 50) {
    passwordLengthNumber.value = 50;
    passwordLengthRange.value = 50;
    passwordSize = 50;
  }

  generateStrongPassword(
    includeUpperCase,
    includeLowerCase,
    includeNumbers,
    includeSpecialCharacters,
    passwordSize
  );
});

function generateStrongPassword(
  includeUpperCase,
  includeLowerCase,
  includeNumbers,
  includeSpecialCharacters,
  passwordSize
) {
  const finalPassword = [];

  if (
    !includeUpperCase &&
    !includeLowerCase &&
    !includeNumbers &&
    !includeSpecialCharacters
  ) {
    includeLowerCase = true;
    passwordLowercase.checked = true;
  }

  for (let i = 1; i <= passwordSize; i++) {
    includeUpperCase &&
      finalPassword.push(String.fromCharCode(getRandomCode(UPPERCASE_CODES)));

    includeLowerCase &&
      finalPassword.push(String.fromCharCode(getRandomCode(LOWERCASE_CODES)));

    includeNumbers &&
      finalPassword.push(String.fromCharCode(getRandomCode(NUMBER_CODES)));

    includeSpecialCharacters &&
      finalPassword.push(
        String.fromCharCode(getRandomCode(SPECIAL_CHARACTER_CODES))
      );
  }

  passwordElement.textContent = shuffleArray(finalPassword)
    .slice(0, passwordSize)
    .join("");
}

function getRandomCode(CODES) {
  return CODES[Math.floor(Math.random() * CODES.length)];
}

function shuffleArray(array) {
  const arrlength = array.length;

  if (arrlength === 0) return [];

  let curIndex = arrlength;

  while (curIndex > 0) {
    const randIndex = Math.floor(Math.random() * curIndex);
    curIndex--;

    const temp = array[curIndex];
    array[curIndex] = array[randIndex];
    array[randIndex] = temp;
  }

  return array;
}
