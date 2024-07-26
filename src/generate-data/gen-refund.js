import * as fs from "fs";
import { Helper } from "../../lib/helper";

export default async function genRefundData(opts) {
  const { data, numData, repsDataPath } = opts;
  let _data = [];
  const dataPath = `./data/${repsDataPath}/data-refund-full-sign.json`;
  for (let i = 0; i < data.length; i++) {
    const payload = {
      reason: "Customer complain",
      originalReferenceNo: "",
      originalExternalId: "",
      originalPartnerReferenceNo: data[i].partnerRefNo,
      partnerRefundNo: data[i].partnerRefNo + "RF",
      refundAmount: {
        currency: "IDR",
        value: "100.00",
      },
      additionalInfo: {
        refundId: "id" + data[i].partnerRefNo,
        customerId: data[i].customerId,
        lenderProductId: "DANA_CICIL_FALCON_01",
        creditUsageMutation: {
          currency: "IDR",
          value: "81.00",
        },
        refundedOriginalOrderAmount: {
          currency: "IDR",
          value: "108.00",
        },
        newTransaction: null,
        disburseBackAmount: {
          currency: "IDR",
          value: "27.00",
        },
        refundTime: "2023-11-13T21:31:01+07:00",
        refundedTransaction: {
          refundedPartnerReferenceNo: data[i].partnerRefNo,
          refundedBillDetailList: [
            {
              billId: data[i].billIds[0],
              cumulateDueDateId: "11198466580183100DANA_CICIL_FALCON_01",
              dueDate: "20240327",
              interestFeeAmount: {
                currency: "IDR",
                value: "2.00",
              },
              lateFeeAmount: {
                currency: "IDR",
                value: "0.00",
              },
              paidInterestFeeAmount: {
                currency: "IDR",
                value: "2.00",
              },
              paidLateFeeAmount: {
                currency: "IDR",
                value: "0.00",
              },
              paidPrincipalAmount: {
                currency: "IDR",
                value: "25.00",
              },
              periodNo: "1",
              principalAmount: {
                currency: "IDR",
                value: "25.00",
              },
              totalAmount: {
                currency: "IDR",
                value: "27.00",
              },
              totalPaidAmount: {
                currency: "IDR",
                value: "27.00",
              },
              billStatus: "CANCEL",
            },
            {
              billId: data[i].billIds[1],
              cumulateDueDateId: "22298466580183100DANA_CICIL_FALCON_01",
              dueDate: "20240413",
              interestFeeAmount: {
                currency: "IDR",
                value: "2.00",
              },
              lateFeeAmount: {
                currency: "IDR",
                value: "0.00",
              },
              paidInterestFeeAmount: {
                currency: "IDR",
                value: "0.00",
              },
              paidLateFeeAmount: {
                currency: "IDR",
                value: "0.00",
              },
              paidPrincipalAmount: {
                currency: "IDR",
                value: "0.00",
              },
              periodNo: "2",
              principalAmount: {
                currency: "IDR",
                value: "25.00",
              },
              totalAmount: {
                currency: "IDR",
                value: "27.00",
              },
              totalPaidAmount: {
                currency: "IDR",
                value: "0.00",
              },
              billStatus: "CANCEL",
            },
            {
              billId: data[i].billIds[2],
              cumulateDueDateId: "3334664581183100DANA_CICIL_FALCON_01",
              dueDate: "20240427",
              interestFeeAmount: {
                currency: "IDR",
                value: "2.00",
              },
              lateFeeAmount: {
                currency: "IDR",
                value: "0.00",
              },
              paidInterestFeeAmount: {
                currency: "IDR",
                value: "0.00",
              },
              paidLateFeeAmount: {
                currency: "IDR",
                value: "0.00",
              },
              paidPrincipalAmount: {
                currency: "IDR",
                value: "0.00",
              },
              periodNo: "3",
              principalAmount: {
                currency: "IDR",
                value: "25.00",
              },
              totalAmount: {
                currency: "IDR",
                value: "27.00",
              },
              totalPaidAmount: {
                currency: "IDR",
                value: "0.00",
              },
              billStatus: "CANCEL",
            },
            {
              billId: data[i].billIds[3],
              cumulateDueDateId: "44498464581183100DANA_CICIL_FALCON_01",
              dueDate: "20240513",
              interestFeeAmount: {
                currency: "IDR",
                value: "2.00",
              },
              lateFeeAmount: {
                currency: "IDR",
                value: "0.00",
              },
              paidInterestFeeAmount: {
                currency: "IDR",
                value: "0.00",
              },
              paidLateFeeAmount: {
                currency: "IDR",
                value: "0.00",
              },
              paidPrincipalAmount: {
                currency: "IDR",
                value: "0.00",
              },
              periodNo: "4",
              principalAmount: {
                currency: "IDR",
                value: "25.00",
              },
              totalAmount: {
                currency: "IDR",
                value: "27.00",
              },
              totalPaidAmount: {
                currency: "IDR",
                value: "0.00",
              },
              billStatus: "CANCEL",
            },
          ],
        },
        refundedRepaymentDetailList: [
          {
            billId: data[i].billIds[0],
            refundedRepaymentInterestFeeAmount: {
              currency: "IDR",
              value: "2.00",
            },
            refundedRepaymentLateFeeAmount: {
              currency: "IDR",
              value: "0.00",
            },
            refundedRepaymentPrincipalAmount: {
              currency: "IDR",
              value: "25.00",
            },
            refundedTotalRepaymentAmount: {
              currency: "IDR",
              value: "27.00",
            },
            repaymentPartnerReferenceNo: data[i].repaymentPartnerRefNo + "1",
          },
        ],
      },
    };
    let timestamp = Helper.getFormattedDate();
    const apiRoute = "/api/integration/v1.0/debit/refund";
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
