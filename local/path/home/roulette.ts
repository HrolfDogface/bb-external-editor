export async function main(ns: NS) {
    //ns.disableLog('ALL');
    //ns.ui.openTail();
    for(let i = 0; i < 1000; i++){
        const time: number = new Date().getTime();
        const doc = eval('document');
        const playButton = doc.evaluate("//button[text() = 'Play roulette']", doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (playButton !== null) {
          //ns.print("found head button!");
          await playButton[Object.keys(playButton)[1]].onClick({ isTrusted: true });        
        } else{
            return;
        }

        const rng = new WHRNG(time);
        const result: number = Math.floor(rng.random() * 37);

        const amount = doc.evaluate("//html/body/div[1]/div[2]/div[2]/div/div/input", doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if ((amount !== null)&&(amount !== undefined)) {
            await amount[Object.keys(amount)[1]].onChange({ isTrusted: true, currentTarget: { value: '99999999' }});
          } else{
              return;
          }
        
        const numButton = doc.evaluate("//button[text() = '" + String(result) + "']", doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (numButton !== null) {
          await numButton[Object.keys(numButton)[1]].onClick({ isTrusted: true });
        } else{
            return;
        }        
        const quitButton = doc.evaluate("//button[text() = 'Stop playing']", doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (quitButton !== null) {
          //ns.print("found head button!");
          await quitButton[Object.keys(quitButton)[1]].onClick({ isTrusted: true });        
        } else{
            return;
        }
        await ns.sleep(1);

    }
    
    

}

//await input[Object.keys(input)[1]].onChange({ isTrusted: true, target: { value: text } });
///html/body/div[1]/div[2]/div[2]/div/div/input
///html/body/div[1]/div[2]/div[2]/div/div
///html/body/div[1]/div[2]/div[2]/div
//html/body/div[1]/div[2]/div[2]/div/div/div/input

//<div class="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-colorPrimary MuiInputBase-formControl css-1h6tvjo">
//<input aria-invalid="false" placeholder="Amount to play" type="number" class="MuiInputBase-input MuiInput-input css-1q37fkn" value="" id="mui-2482">
//</div>

//<input aria-invalid="false" type="number" class="MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedStart css-1q37fkn" value="1000000" id="mui-2535">

export class WHRNG {
    s1 = 0;
    s2 = 0;
    s3 = 0;
  
    constructor(totalPlaytime: number) {
      // This one is seeded by the players total play time.
      const v: number = (totalPlaytime / 1000) % 30000;
      this.s1 = v;
      this.s2 = v;
      this.s3 = v;
    }
  
    step(): void {
      this.s1 = (171 * this.s1) % 30269;
      this.s2 = (172 * this.s2) % 30307;
      this.s3 = (170 * this.s3) % 30323;
    }
  
    random(): number {
      this.step();
      return (this.s1 / 30269.0 + this.s2 / 30307.0 + this.s3 / 30323.0) % 1.0;
    }
  }