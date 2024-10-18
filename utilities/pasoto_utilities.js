import { V3 } from "paseto";
const { encrypt, decrypt, generateKey } = V3;
export async function encryptPaseto(payload) {
  let key = generateKey("local");
  return {
    key,
    paseto: await encrypt(payload, key, {
      audience: "urn:example:client",
      issuer: "https://op.example.com",
      clockTolerance: "1 hour",
    }),
  };
}

export async function decryptPaseto(token, key) {
  return await decrypt(token, key);
}
