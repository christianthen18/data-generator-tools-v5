import { Helper } from "../../lib/helper";

export default async function manualSign() {
  const payload = {
    reason: "Customer complain",
    originalReferenceNo: "",
    originalExternalId: "",
    originalPartnerReferenceNo: "PCP15428808X",
    partnerRefundNo: "PCP15428808XRF",
    refundAmount: {
      currency: "IDR",
      value: "100.00",
    },
    additionalInfo: {
      refundId: "idPCP15428808X",
      customerId: "NDODCUST203800005",
      lenderProductId: "DANA_CICIL_FALCON_01",
      creditUsageMutation: {
        currency: "IDR",
        value: "108.00",
      },
      refundedOriginalOrderAmount: {
        currency: "IDR",
        value: "108.00",
      },
      newTransaction: null,
      disburseBackAmount: {
        currency: "IDR",
        value: "0.00",
      },
      refundTime: "2023-11-13T21:31:01+07:00",
      refundedTransaction: {
        refundedPartnerReferenceNo: "PCP15428808X",
        refundedBillDetailList: [
          {
            billId: "PCB154288039",
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
            billStatus: "CANCEL",
          },
          {
            billId: "PCB1542880OM",
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
            billId: "PCB15428803T",
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
            billId: "PCB1542880AU",
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
      refundedRepaymentDetailList: [],
    },
  };

  let timestamp = Helper.getFormattedDate();
  const apiRoute = "/api/integration/v1.0/debit/refund";
  const signature = await Helper.getSignature(payload, timestamp, apiRoute);

  console.log("sign--: ", signature);
  console.log("timestamp--: ", timestamp);
}
