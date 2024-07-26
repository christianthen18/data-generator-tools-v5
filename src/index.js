import genAccBindData from "./generate-data/gen-acc-bind";
import genManualSign from "./generate-data/gen-manual-sign";
import genPaymentConsultData from "./generate-data/gen-payment-consult";
import genRepaymentData from "./generate-data/gen-repayment";
import manualSign from "./generate-data/manual-sign";

const args = process.argv.slice(2);
const dataArgs = {};

function checkArgsNumData() {
  if (dataArgs.numData === undefined) {
    throw "| missing 'numData' option - try run with options eg. \n| node [file-name] --numData=[number of data to generate] \n======================================= \n\n";
  }
}

function checkArgsPrefix() {
  if (dataArgs.prefix === undefined) {
    throw "| missing 'prefix' option - try run with options eg. \n| node [file-name] --prefix=[2-char-prefix] \n======================================= \n\n";
  }
  if (dataArgs.prefix.length !== 2) {
    throw "| 'prefix' option length must be 2 - try run with options eg. \n| node [file-name] --prefix=[2-char-prefix] \n======================================= \n\n";
  }
}

args.forEach((item) => {
  if (!item.startsWith("")) return;
  const _argument = item.substring(2).split("=");
  dataArgs[_argument[0]] = _argument[1];
});

if (dataArgs.genData === undefined) {
  throw "| missing 'genData' option - try run with options eg. \n| node [file-name] --genData=[acc-bind | payment-consult | repayment | refund | manual-sign] \n======================================= \n\n";
}

if (dataArgs.genData === "acc-bind") {
  checkArgsNumData();
  const reps = dataArgs.reps ?? 1;
  const startTime = new Date().getTime();
  for (let i = 0; i < reps; i++) {
    genAccBindData({
      numData: parseInt(dataArgs.numData),
      repsDataPath: `reps_accbind_${i+1}`
    });
  }
  const endTime = new Date().getTime();

  console.log(
    `successfully generate ${dataArgs.numData} account bind data\ntook ${(
      (endTime - startTime) /
      1000
    ).toFixed(3)}s to complete\n\n`
  );
}

if (dataArgs.genData === "payment-consult") {
  checkArgsNumData();
  checkArgsPrefix();

  const reps = dataArgs.reps ?? 1;
  const startTime = new Date().getTime();
  for (let i = 0; i < reps; i++) {
    console.log(`Generating data for prefix ${dataArgs.prefix}${i+1}...`)
    genPaymentConsultData({
      numData: parseInt(dataArgs.numData),
      customerId: dataArgs.customerId,
      prefix: dataArgs.prefix+(i+1),
      repsDataPath: `reps_${dataArgs.prefix}_${i+1}`
    });
    console.log(`Complete generate data for prefix ${dataArgs.prefix}${i+1}\n\n`);

  }
  const endTime = new Date().getTime();

  console.log(
    `successfully generate ${dataArgs.numData} payment consult data\ntook ${(
      (endTime - startTime) /
      1000
    ).toFixed(3)}s to complete\n\n`
  );
}

if (dataArgs.genData === "repayment") {
  checkArgsNumData();
  genRepaymentData({
    numData: parseInt(dataArgs.numData),
  });
  console.log(`successfully generate ${dataArgs.numData} repyament data\n\n`);
}

if (dataArgs.genData === "manual-sign") {
  manualSign();
  console.log("success generate sign---------------------\n\n");
}

if (dataArgs.genData === "acc-bind-inquiry") {
  const pathToRead = "./src/generate-data/acc-bind-inquiry-data.json";
  const pathToWrite = "./data/data-acc-bind-inquiry-sign.json";
  genManualSign(pathToRead, pathToWrite, 5000);
  console.log("success generate acc bind inquiry data\n\n");
}

if (dataArgs.genData === "update-acc-info") {
  const pathToRead = "./src/generate-data/update-acc-info-data.json";
  const pathToWrite = "./data/data-update-acc-info-sign.json";
  genManualSign(pathToRead, pathToWrite, 5000);
  console.log("success generate update account info data\n\n");

}

if (dataArgs.genData === "query-payment") {
  const pathToRead = "./src/generate-data/query-payment-data.json";
  const pathToWrite = "./data/data-query-payment-sign.json";
  genManualSign(pathToRead, pathToWrite, 5000);
  console.log("success generate query payment data\n\n");
}
