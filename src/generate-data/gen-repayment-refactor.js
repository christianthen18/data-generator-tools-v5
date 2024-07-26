import * as fs from "fs";
import { Helper } from "../../lib/helper";

export default async function genRepaymentRefactorData(opts) {
  const { data, numData, repsDataPath } = opts;
  let _data = [];
  const dataPath = `./data/${repsDataPath}/data-repayment-refactor-sign.json`;
  for (let i = 0; i < data.length; i++) {
    const partnerRefNo = data[i].repaymentPartnerRefNo;
    const repaymentId = Helper.genRandom(21, false);
    const payload = {
      partnerReferenceNo: partnerRefNo + "1",
      customerId: data[i].customerId,
      repaidTime: "2024-03-15T21:16:28+07:00",
      lenderProductId: "DANA_CICIL_FALCON_01",
      repaymentDetailList: [
        {
          billId: data[i].billIds[0],
          billStatus: "PAID",
          repaymentInterestFeeAmount: {
            currency: "IDR",
            value: "2.00",
          },
          repaymentLateFeeAmount: {
            currency: "IDR",
            value: "0.00",
          },
          repaymentPrincipalAmount: {
            currency: "IDR",
            value: "25.00",
          },
          totalRepaymentAmount: {
            currency: "IDR",
            value: "27.00",
          },
          originalPartnerReferenceNo: data[i].partnerRefNo,
          cumulateDueDateId: "22298466580183101DANA_CICIL_FALCON_01",
        },
      ],
      creditUsageMutation: {
        value: "27.00",
        currency: "IDR",
      },
      additionalInfo: {
        repaymentId: repaymentId + "1",
      },
    };
    let timestamp = Helper.getFormattedDate();
    const apiRoute = "/api/integration/v1.0/debit/repayment-host-to-host-refactor";
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
