import moment from "moment";
import cryptojs from "crypto-js";
import JSEncrypt from "jsencrypt";
import axios from 'axios';

export class Helper {
  static async getSignature(payload, timestamp, apiRoute) { // Jadikan metode asinkron
    // Pre-process body
    // let rawBody = JSON.stringify(payload);

    const apiUrl = 'http://localhost:7264/api/integration/v1.0/gen-signature';

    let rawBody = {
      apiRoute: apiRoute,
      payload: payload,
      timestamp: timestamp
    };

    try {
      // Memanggil API menggunakan Axios dan menunggu hasilnya
      const response = await axios.post(apiUrl, rawBody);

      return response.data; // Kembalikan hasil signature
    } catch (error) {
      console.error('Terjadi kesalahan saat memanggil API:', error);
      throw error; // Lempar kesalahan agar dapat ditangani di tempat lain
    }
  }

  static getEncrypted(plain_text) {
    let aes_shared_key = "xLAQmSMmP29019D1tiGXrlA8hbFQLO1LxTF3zpmMy7c=";
    let key = cryptojs.enc.Base64.parse(aes_shared_key);
    let result = cryptojs.AES.encrypt(plain_text, key, {
      mode: cryptojs.mode.ECB,
      padding: cryptojs.pad.Pkcs7,
    });
    return cryptojs.enc.Base64.stringify(result.ciphertext);
  }

  static genRandom(length, isNumeric = false) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";

    const charactersLength = characters.length;
    const numbersLength = numbers.length;

    let tim = Date.now().toString();
    const timestamp = tim.substring(6, tim.length);
    const randomLength = length - timestamp.length;

    if (randomLength > 0) {
      if (isNumeric) {
        for (let i = 0; i < randomLength; i++) {
          if (Math.random() < 0.5) {
            result += characters.charAt(
              Math.floor(Math.random() * charactersLength)
            );
          } else {
            result += numbers.charAt(Math.floor(Math.random() * numbersLength));
          }
        }
      } else {
        for (let i = 0; i < randomLength; i++) {
          result += numbers.charAt(Math.floor(Math.random() * numbersLength));
        }
      }
    }
    result = timestamp + result;
    return result.toUpperCase();
  }

  static getFormattedDate() {
    return moment().format("yyyy-MM-DDThh:mm:ssZ");
  }

  static randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min) - 1;
  }
}
