import * as fs from "fs";
import { Helper } from "../../lib/helper";

export default async function genAccBindData(opts) {
  const { numData, repsDataPath } = opts;
  let _data = [];
  if (fs.existsSync(`./data/${repsDataPath}`)) {
    fs.readdirSync(`./data/${repsDataPath}`, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        fs.unlink(path.join(`./data/${repsDataPath}`, file), (err) => {
          if (err) throw err;
        })
      }
    })
  } else {
    fs.mkdirSync(`./data/${repsDataPath}`);
  }
  const dataPath = `./data/${repsDataPath}/data-acc-bind-sign.json`;
  for (let i = 0; i < numData; i++) {
    let cardid = Helper.genRandom(16, false);
    let customerId = "PWS" + Helper.genRandom(10, true);
    let partnerReferenceNo = "CWS" + Helper.genRandom(9, true);
    let phoneNo = Helper.genRandom(10, false);
    const identificationInfoPayload = {
      monthlyIncomeRange: "Rp1.000.000-Rp2.000.000",
      pob: "Jakarta",
      address: "Jalan Kebon Jeruk Raya 80",
      provinceHomeAddress: "DKI Jakarta",
      occupation: "DOC",
      cardName: "James Rod" + Helper.genRandom(7, true),
      motherMaidenName: "MegaChan",
      gender: "Male",
      postalCode: "11540",
      cardType: "DRIVER_LICENSE/IDENTIFICATION_NUMBER",
      employerName: "DANA INDONESIA",
      employerBusinessCategory: "Financial Service",
      districtHomeAddress: "Kebon Jeruk",
      nearestLandmark: "Monumen Nasional",
      dob: "07-07-1997",
      cityHomeAddress: "Jakarta Barat",
      cardId: cardid,
      identityCardImage:
        "https://s.kaskus.id/images/2013/08/04/3832690_20130804064129.jpg",
      subDistrictHomeAddress: "Kedoya",
      email: "OkGas@gmail.com",
      selfieImage:
        "https://awsimages.detik.net.id/community/media/visual/2017/12/06/6414c1ae-fcd1-49a6-8316-4a71c29f93ff_43.jpg?w=600&q=90",
      educationalLevel: "S3",
    };
    const enc_identificationInfoPayload = Helper.getEncrypted(
      JSON.stringify(identificationInfoPayload)
    );
    const payload = {
      additionalInfo: {
        registrationTime: "2024-06-06T15:08:13+07:00",
        income: 0,
        identificationInfo: enc_identificationInfoPayload,
        platformCheckResult: {
          matchScore: 10.7,
          verificationResult: true,
        },
        proposedCreditLimit: {
          value: 1008000000.0,
          currency: "IDR",
        },
        creditScore: 100,
        appId: "8887778",
        lenderProductId: "DANA_CICIL_FALCON_01",
      },
      customerId: customerId, //RANDOM
      partnerReferenceNo: partnerReferenceNo, //RANDOM
      phoneNo: "62" + phoneNo,
    };
    let timestamp = Helper.getFormattedDate();
    const apiRoute = "/api/integration/v1.0/registration-account-creation";
    const signature = await Helper.getSignature(payload, timestamp, apiRoute);
    _data.push({
      payload,
      signature,
      timestamp,
    });

    if (i == 0) {
      fs.writeFileSync(dataPath, JSON.stringify(_data).slice(0, -1), "utf-8");
    } else {
      fs.appendFileSync(
        dataPath,
        "," + JSON.stringify(_data).slice(1, -1),
        "utf-8"
      );
    }

    if (i === numData - 1) {
      fs.appendFileSync(dataPath, "]");
    }

    _data = [];
  }
}
