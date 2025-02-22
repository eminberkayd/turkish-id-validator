# Turkish ID Validator

A simple npm package to validate Turkish Republic Identity Number (TC Kimlik No) and check if a person is a valid TR citizen.

## Installation

```bash
npm install turkish-id-validator
```

## Usage

```ts
import { isValidTurkishId, isValidTurkishCitizen } from "turkish-id-validator";

// Validate Turkish ID - It uses checksum algorithm of TCKN to validate
console.log(isValidTurkishId("12345678901")); // false

isValidTurkishCitizen({
    firstname: 'Nuri Bilge', 
    lastname: 'Ceylan', 
    identity: '12345678901', 
    birthyear: 1959
}).then((isValidCitizen) => {
    if (isValidCitizen) {
        console.log("This person is a valid Turkish citizen");
    } else {
        console.log("This person is not a valid Turkish citizen");
    }
}).catch((error) => {
    console.error('Turkish API Request failed! ' + error?.message);
});

```
