import * as fs from "fs";
import { Helper } from "../../lib/helper";
import genRepaymentData from "./gen-repayment";
import genRepaymentRefactorData from "./gen-repayment-refactor";
import genRefundData from "./gen-refund";
import genRefundWithoutRepaymentData from "./gen-refund-without-repayment";
import path from "path";

export default async function genPaymentConsultData(opts) {
  const { numData, prefix, repsDataPath } = opts;
  let _data = [];
  let _data2 = [];
  let _dataBillRepayment = [];
  let _dataBillRefund = [];
  let custIdArr = JSON.parse(
    fs.readFileSync("./src/generate-data/cust-data.json", "utf-8")
  );

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

  const dataPath = `./data/${repsDataPath}/data-payment-consult-sign.json`;
  const dataPath2 = `./data/${repsDataPath}/data-payment-notify-sign.json`;
  for (let i = 0; i < numData; i++) {
    const randNum = Helper.randomIntFromInterval(1, custIdArr.length);

    const _custId = custIdArr[randNum];
    const partnerRefNo = `${prefix}C` + Helper.genRandom(9, true);
    const paymentId = `${prefix}Y` + Helper.genRandom(9, true);

    const billId1 = `${prefix}B` + Helper.genRandom(9, true);
    const billId2 = `${prefix}B` + Helper.genRandom(9, true);
    const billId3 = `${prefix}B` + Helper.genRandom(9, true);
    const billId4 = `${prefix}B` + Helper.genRandom(9, true);

    const repaymentPartnerRefNo =
      `${prefix}P` + Helper.genRandom(9, true) + "_REPAY";
    const _dataForRepayment = {
      partnerRefNo: partnerRefNo,
      repaymentPartnerRefNo: repaymentPartnerRefNo,
      customerId: _custId,
      billIds: [billId1],
    };
    _dataBillRepayment.push(_dataForRepayment);

    const _dataForRefund = {
      partnerRefNo: partnerRefNo,
      repaymentPartnerRefNo: repaymentPartnerRefNo,
      customerId: _custId,
      billIds: [billId1, billId2, billId3, billId4],
    };
    _dataBillRefund.push(_dataForRefund);

    const payload = {
      partnerReferenceNo: partnerRefNo,
      merchantId: "216620000213188409999",
      amount: {
        value: "100.00",
        currency: "IDR",
      },
      additionalInfo: {
        orderInfo:
          '{"scenarioGrouping":"ONLINE","merchantId":"02a266894737da2529e50695d424ce11","scenarioSubGrouping":"TELCO","merchantScenario":"MjE2NjIwMDAwMTYwMDMxNzQ2MDU0","orderInfo":"6f75656689badba8ab15f6934cfcb431","amount":"9990","transactionTime":"1710309611006","extInfo":{"installmentRequestId":"20240313111212898172166059837035285"}}',
        customerId: _custId,
        transTime: "2024-03-15T21:15:28+07:00",
        lenderProductId: "DANA_CICIL_FALCON_01",
        creditUsageMutation: {
          value: "108.00",
          currency: "IDR",
        },
        billDetailList: [],
        repaymentPlanList: [
          {
            totalAmount: {
              value: "27.00",
              currency: "IDR",
            },
            dueDate: "20240327",
            principalAmount: {
              value: "25.00",
              currency: "IDR",
            },
            interestFeeAmount: {
              value: "2.00",
              currency: "IDR",
            },
            periodNo: "1",
          },
          {
            totalAmount: {
              value: "27.00",
              currency: "IDR",
            },
            dueDate: "20240413",
            principalAmount: {
              value: "25.00",
              currency: "IDR",
            },
            interestFeeAmount: {
              value: "2.00",
              currency: "IDR",
            },
            periodNo: "2",
          },
          {
            totalAmount: {
              value: "27.00",
              currency: "IDR",
            },
            dueDate: "20240427",
            principalAmount: {
              value: "25.00",
              currency: "IDR",
            },
            interestFeeAmount: {
              value: "2.00",
              currency: "IDR",
            },
            periodNo: "3",
          },
          {
            totalAmount: {
              value: "27.00",
              currency: "IDR",
            },
            dueDate: "20240513",
            principalAmount: {
              value: "25.00",
              currency: "IDR",
            },
            interestFeeAmount: {
              value: "2.00",
              currency: "IDR",
            },
            periodNo: "4",
          },
        ],
        agreementInfo: null,
        originalOrderAmount: {
          value: "99.90",
          currency: "IDR",
        },
        isNeedApproval: true,
        paymentId: paymentId,
        installmentConfig: {
          installmentCount: 4,
          dueDateDuration: 14,
          principalRoundingScale: 2,
          dueDateConfig:
            '[{"cutOffEndDate":21,"cutOffStartDate":8,"dueDate":27},{"cutOffEndDate":7,"cutOffStartDate":22,"dueDate":13}]',
          interestConfig: {
            feeMode: "PERCENTAGE",
            feeRate: 8,
            roundingScale: 0,
            roundingType: "UP",
          },
        },
      },
    };
    let timestamp = Helper.getFormattedDate();
    const apiRoute = "/api/integration/v1.0/debit/payment-host-to-host";
    const signature = await Helper.getSignature(payload, timestamp, apiRoute);
    _data.push({
      payload,
      signature,
      timestamp,
    });

    const payload2 = {
      partnerReferenceNo: partnerRefNo,
      merchantId: "216620000213188409999",
      amount: {
        currency: "IDR",
        value: "100.00",
      },
      additionalInfo: {
        orderInfo:
          '{"scenarioGrouping":"ONLINE","merchantId":"02a266894737da2529e50695d424ce11","scenarioSubGrouping":"TELCO","merchantScenario":"MjE2NjIwMDAwMTYwMDMxNzQ2MDU0","orderInfo":"6f75656689badba8ab15f6934cfcb431","amount":"9990","transactionTime":"1710309611006","extInfo":{"installmentRequestId":"20240313111212898172166059837035285"}}',
        customerId: _custId,
        transTime: "2024-03-15T21:15:28+07:00",
        lenderProductId: "DANA_CICIL_FALCON_01",
        creditUsageMutation: {
          currency: "IDR",
          value: "108.00",
        },
        billDetailList: [
          {
            billId: billId1,
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
            lenderProductId: "DANA_CICIL_FALCON_01",
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
              value: "0.00",
            },
          },
          {
            billId: billId2,
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
            lenderProductId: "DANA_CICIL_FALCON_01",
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
          },
          {
            billId: billId3,
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
            lenderProductId: "DANA_CICIL_FALCON_01",
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
          },
          {
            billId: billId4,
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
            lenderProductId: "DANA_CICIL_FALCON_01",
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
          },
        ],
        agreementInfo: {
          partnerTnc:
            "https://a.m.dana.id/resource/htmls/dana-credit/DANA-cicil-tnc.html",
          partnerEmail: "help@dana.id",
          partnerPrivacyRule:
            "https://a.m.dana.id/resource/htmls/dana-credit/DANA-cicil-tnc.html",
          maxLateFeeDays: "120",
          lateFeeRate: "0.27",
          provisionFeeAmount: {
            currency: "IDR",
            value: "0.00",
          },
        },
        originalOrderAmount: {
          currency: "IDR",
          value: "100.00",
        },
        paymentId: paymentId,
        isNeedApproval: false,
        repaymentPlanList: [
          {
            totalAmount: {
              currency: "IDR",
              value: "27.00",
            },
            dueDate: "20240327",
            principalAmount: {
              currency: "IDR",
              value: "25.00",
            },
            interestFeeAmount: {
              currency: "IDR",
              value: "2.00",
            },
            periodNo: "1",
          },
          {
            totalAmount: {
              currency: "IDR",
              value: "27.00",
            },
            dueDate: "20240413",
            principalAmount: {
              currency: "IDR",
              value: "25.00",
            },
            interestFeeAmount: {
              currency: "IDR",
              value: "2.00",
            },
            periodNo: "2",
          },
          {
            totalAmount: {
              currency: "IDR",
              value: "27.00",
            },
            dueDate: "20240427",
            principalAmount: {
              currency: "IDR",
              value: "25.00",
            },
            interestFeeAmount: {
              currency: "IDR",
              value: "2.00",
            },
            periodNo: "3",
          },
          {
            totalAmount: {
              currency: "IDR",
              value: "27.00",
            },
            dueDate: "20240513",
            principalAmount: {
              currency: "IDR",
              value: "25.00",
            },
            interestFeeAmount: {
              currency: "IDR",
              value: "2.00",
            },
            periodNo: "4",
          },
        ],
        installmentConfig: {
          installmentCount: 4,
          dueDateDuration: 14,
          principalRoundingScale: 2,
          dueDateConfig:
            '[{"cutOffEndDate":21,"cutOffStartDate":8,"dueDate":27},{"cutOffEndDate":7,"cutOffStartDate":22,"dueDate":13}]',
          interestConfig: {
            feeMode: "PERCENTAGE",
            feeRate: 8,
            roundingScale: 0,
            roundingType: "UP",
          },
        },
      },
    };
    const apiRoute2 = "/api/integration/v1.0/debit/payment-host-to-host";
    const signature2 = await Helper.getSignature(payload2, timestamp, apiRoute2);
    _data2.push({
      payload: payload2,
      signature: signature2,
      timestamp,
    });

    if (i == 0) {
      fs.writeFileSync(dataPath, JSON.stringify(_data).slice(0, -1), "utf-8");
      fs.writeFileSync(dataPath2, JSON.stringify(_data2).slice(0, -1), "utf-8");
    } else {
      fs.appendFileSync(
        dataPath,
        "," + JSON.stringify(_data).slice(1, -1),
        "utf-8"
      );
      fs.appendFileSync(
        dataPath2,
        "," + JSON.stringify(_data2).slice(1, -1),
        "utf-8"
      );
    }

    if (i === numData - 1) {
      fs.appendFileSync(dataPath, "]");
      fs.appendFileSync(dataPath2, "]");
    }

    _data = [];
    _data2 = [];
  }

  genRepaymentData({
    data: _dataBillRepayment,
    numData: numData,
    repsDataPath: repsDataPath,
  });
  genRepaymentRefactorData({
    data: _dataBillRepayment,
    numData: numData,
    repsDataPath: repsDataPath,
  });
  genRefundData({
    data: _dataBillRefund,
    numData: numData,
    repsDataPath: repsDataPath,
  });
  genRefundWithoutRepaymentData({
    data: _dataBillRefund,
    numData: numData,
    repsDataPath: repsDataPath,
  });
}
