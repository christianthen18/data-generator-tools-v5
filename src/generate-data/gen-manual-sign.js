import { Helper } from "../../lib/helper";
import * as fs from "fs";

export default async function genManualSign(pathToRead, pathToWrite, numData) {
  const data = JSON.parse(fs.readFileSync(pathToRead, 'utf-8'));
  const payload = data.payload;
  const apiRoute = data.apiRoute;
  let _data = [];


  for (let i = 0; i < numData; i++) {
    const randNum = Helper.randomIntFromInterval(1, payload.length);
    let timestamp = Helper.getFormattedDate();
    const signature = await Helper.getSignature(payload[randNum], timestamp, apiRoute);
  
    _data.push({
      payload: payload[randNum],
      signature,
      timestamp
    });

    if (i == 0) {
      fs.writeFileSync(pathToWrite, JSON.stringify(_data).slice(0, -1), "utf-8");
    } else {
      fs.appendFileSync(
        pathToWrite,
        "," + JSON.stringify(_data).slice(1, -1),
        "utf-8"
      );
    }

    if (i === numData - 1) {
      fs.appendFileSync(pathToWrite, "]");
    }

    _data = [];
  }
}
