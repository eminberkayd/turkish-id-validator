/**
 * Validates a given Turkish Republic Identity Number (TC Kimlik No).
 * * It checks if the given id is valid by using the checksum algorithm of the Turkish Republic Identity Number.
 * 
 * @param id - The 11-digit identity number as a string
 * @returns boolean - True if valid, false otherwise
 */
export const isValidTurkishId = (id: string): boolean => {
    // Basic validation
    if (!id || id.length !== 11 || id[0] === '0') {
        return false;
    }

    // Quick check for non-numeric values
    if (!/^\d{11}$/.test(id)) {
        return false;
    }

    // Check for repeated digits - these are passing checksum validation but are invalid
    const erroneousNumbers = [
        '11111111110',
        '22222222220',
        '33333333330',
        '44444444440',
        '55555555550',
        '66666666660',
        '77777777770',
        '88888888880',
        '99999999990'
    ];
    if (erroneousNumbers.includes(id)) {
        return false;
    }

    // Convert ID into an array of numbers
    const digits = id.split('').map(Number);

    // Sum of odd and even indexed digits (0-based index)
    const oddSum = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
    const evenSum = digits[1] + digits[3] + digits[5] + digits[7];

    // First checksum validation
    const checksum1 = Math.abs((7 * oddSum - evenSum) % 10);
    if (checksum1 !== digits[9]) {
        return false;
    }

    // Second checksum validation
    const totalSum = digits.slice(0, 10).reduce((acc, digit) => acc + digit, 0);
    const checksum2 = totalSum % 10;

    return checksum2 === digits[10];
}