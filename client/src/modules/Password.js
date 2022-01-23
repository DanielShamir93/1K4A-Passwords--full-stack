import hash from "object-hash";

export default class Password {
  constructor(privateKey, publicKey) {
    this.hashedPrivateKey = hash(privateKey);
    this.publicKey = publicKey; // already hashed
    this.password = "";
    this.keyboard = [];
  }

  setKeyboard = ({
    avoidChars,
    isIncludeDigits,
    isIncludeUpperCase,
    isIncludeLowerCase,
    isIncludeSymbols,
    mustIncludeChars,
  }) => {
    const symbols = "!\\#$%&'()*+,-./:;<=>?@[]^_`{|}~";

    for (let i = 33; i < 127; i++) {
      let char = String.fromCharCode(i);

      if (/[0-9]/.test(char) && !avoidChars.includes(char) && isIncludeDigits) {
        this.keyboard.push(char);
      } else if (
        /[A-Z]/.test(char) &&
        !avoidChars.includes(char) &&
        isIncludeUpperCase
      ) {
        this.keyboard.push(char);
      } else if (
        /[a-z]/.test(char) &&
        !avoidChars.includes(char) &&
        isIncludeLowerCase
      ) {
        this.keyboard.push(char);
      } else if (
        symbols.includes(char) &&
        !avoidChars.includes(char) &&
        isIncludeSymbols
      ) {
        this.keyboard.push(char);
      }
    }

    Array.from(mustIncludeChars).forEach((char) => {
      if (!this.keyboard.includes(char)) {
        this.keyboard.push(char);
      }
    });
  };

  generate = (passLength, passStartsWith, passEndsWidth) => {
    if (this.keyboard.length > 0) {
      const passwordLength =
        passLength - (passStartsWith.length + passEndsWidth.length);

      this.password += passStartsWith;
      this.setPasswordByFormula(passwordLength);
      this.password += passEndsWidth;
    }
  };

  generateFromPattern = (pattern) => {
    const matchesArray = this.breakPatternToArray(pattern);

    matchesArray.forEach((match) => {
      let modifier = "";
      let modifierAmount = 0;
      if ((modifier = /\\d{\d+}$/.exec(match)) !== null) {
        // Match a number modifier
        this.password += /.*(?=\\d)/.exec(match).join("");
        modifierAmount = modifier[0].replace(/[^\d]/g, "");
        this.keyboard = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        this.setPasswordByFormula(modifierAmount);
      } else if ((modifier = /\u{\d+}$/.exec(match)) !== null) {
        // Match a uppercase modifier
        this.password += /.*(?=\\u)/.exec(match).join("");
        modifierAmount = modifier[0].replace(/[^\d]/g, "");
        this.keyboard = [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z",
        ];
        this.setPasswordByFormula(modifierAmount);
      } else if ((modifier = /\\l{\d+}$/.exec(match)) !== null) {
        // Match a lowercase modifier
        this.password += /.*(?=\\l)/.exec(match).join("");
        modifierAmount = modifier[0].replace(/[^\d]/g, "");
        this.keyboard = [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "j",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "q",
          "r",
          "s",
          "t",
          "u",
          "v",
          "w",
          "x",
          "y",
          "z",
        ];
        this.setPasswordByFormula(modifierAmount);
      } else if ((modifier = /\\s{\d+}$/.exec(match)) !== null) {
        // Match symbols modifier
        this.password += /.*(?=\\s)/.exec(match).join("");
        modifierAmount = modifier[0].replace(/[^\d]/g, "");
        this.keyboard = [
          "!",
          "\\",
          "#",
          "$",
          "%",
          "&",
          "'",
          "(",
          ")",
          "*",
          "+",
          ",",
          "-",
          ".",
          "/",
          ":",
          ";",
          "<",
          "=",
          ">",
          "?",
          "@",
          "[",
          "]",
          "^",
          "_",
          "`",
          "{",
          "|",
          "}",
          "~",
          '"',
        ];
        this.setPasswordByFormula(modifierAmount);
      } else {
        // The last match
        this.password += match;
      }
    });
  };

  setPasswordByFormula = (passLength) => {
    const hashedCombineKeys = hash({
      privateKey: this.hashedPrivateKey,
      publicKey: this.publicKey,
    });
    const hashedCombinedKeysSum = Array.from(hashedCombineKeys).reduce(
      (prevVal, currVal) => {
        return prevVal + currVal.charCodeAt(0);
      },
      0
    );

    for (let i = 0; i < Math.min(hashedCombineKeys.length, passLength); i++) {
      let keyBoardIndex =
        (i + hashedCombineKeys[i].charCodeAt(0) + hashedCombinedKeysSum) %
        this.keyboard.length;
      this.password += this.keyboard[keyBoardIndex];
    }
  };

  breakPatternToArray = (pattern) => {
    const matchesArray = [];
    let str = "";
    let sequence = "";
    const isModifier = (sequence) =>
      /\\[duls]{\d+}/.test(sequence) ? true : false;

    for (let i = 0; i < pattern.length; i++) {
      if (pattern[i] === "\\") {
        // modifier potential
        sequence += "\\";
        for (i = i + 1; i < pattern.length; i++) {
          if (pattern[i] === "}") {
            sequence += pattern[i];
            if (isModifier(sequence)) {
              matchesArray.push(str + sequence);
              str = "";
              sequence = "";
              break;
            }
          } else {
            sequence += pattern[i];
          }
        }
        str += sequence;
        continue;
      }
      str += pattern[i];
    }

    if (str.length > 0) {
      matchesArray.push(str);
    }

    return matchesArray;
  };

  getPassword = () => {
    return this.password;
  };
}
