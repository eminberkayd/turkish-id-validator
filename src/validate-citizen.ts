import * as soap from "soap";

/**
 * Validates if a person is a Turkish citizen
 * @param {isValidTurkishCitizenArgs} args - The arguments for the validation
 * @returns {Promise<boolean>} A promise that resolves to true if the identity number is valid, false otherwise.
 * @throws {Error} If the Turkish API request fails
 */
export const isValidTurkishCitizen = ({ firstname, lastname, identity, birthyear }: isValidTurkishCitizenArgs): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        try {
            soap.createClient('https://tckimlik.nvi.gov.tr/Service/KPSPublic.asmx?WSDL', {}, async (_, client) => {
                await client.TCKimlikNoDogrulaAsync({
                    Ad: firstname,
                    Soyad: lastname,
                    DogumYili: birthyear,
                    TCKimlikNo: identity,
                }, (__: any, response: TCKimlikNoDogrulaApiResponse) => {
                    resolve(response.TCKimlikNoDogrulaResult);
                });
            });
        } catch (error: any) {
            reject({ message: "Turkish API Request failed! " + error?.message });
        }
    });
}

export interface isValidTurkishCitizenArgs {
    /** First name of the person */
    firstname: string,
    lastname: string,
    /** TCKN for the person */
    identity: string,
    /** Birth year of the person */
    birthyear: number
}

export interface TCKimlikNoDogrulaApiResponse {
    TCKimlikNoDogrulaResult: boolean
}
