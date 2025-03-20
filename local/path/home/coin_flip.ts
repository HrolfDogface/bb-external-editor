export async function main(ns: NS) {

    ns.disableLog('ALL');
    ns.ui.openTail();
    await ns.sleep(10000);
    let doc = eval('document');
    let results: string = "";
    const headButton = doc.evaluate("//button[text() = 'Head!']", doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    const tailButton = doc.evaluate("//button[text() = 'Tail!']", doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (headButton !== null) {
      ns.print("found head button!");
      await headButton[Object.keys(headButton)[1]].onClick({ isTrusted: true });
    }
    doc = eval('document');
    let result = doc.evaluate("/html/body/div[1]/div[2]/div[2]/div[1]/p", doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (result !== null) {
      ns.print("found result!");
      ns.print(result.textContent);
      results = results + result.textContent;
    }

    const flips = generateResults();

    let index: number = -1;

    while(index == -1){
        doc = eval('document');
        await headButton[Object.keys(headButton)[1]].onClick({ isTrusted: true });
        doc = eval('document');
        result = doc.evaluate("/html/body/div[1]/div[2]/div[2]/div[1]/p", doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        results = results + result.textContent;
        ns.print(results);
        await ns.sleep(1000);
        index = findIndex(ns, flips, results);
        await ns.sleep(1);
    }

    index = index + results.length;
    ns.print("!!!!!!!!!Start Betting!!!!!!!!!");
    await ns.sleep(10000);
    for(;index < flips.length; index++){
        if(flips[index] == "H"){            
        await headButton[Object.keys(headButton)[1]].onClick({ isTrusted: true });
        }else{            
        await tailButton[Object.keys(tailButton)[1]].onClick({ isTrusted: true });
        }
        await ns.sleep(1);
        doc = eval('document');
        result = doc.evaluate('//*[@id="root"]/div[2]/div[2]/h3', doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (result.textContent == "lose!") return;
    }

    while(true){
        for(index = 0;index < flips.length; index++){
            if(flips[index] == "H"){            
            await headButton[Object.keys(headButton)[1]].onClick({ isTrusted: true });
            }else{            
            await tailButton[Object.keys(tailButton)[1]].onClick({ isTrusted: true });
            }
            await ns.sleep(1);
            doc = eval('document');
            result = doc.evaluate('//*[@id="root"]/div[2]/div[2]/h3', doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            if (result.textContent == "lose!") return;
        }
    }

}

export function generateResults(): string {

    let x: number = 0;
    const m: number = 1024;
    const a: number = 341;
    const c: number = 1;

    let results = "";

    for (let i = 0; i < 1024; i++){
        x = (a*x+c)%m
        if (x/m < .5){
            results = results + "H"
        }
        else{
            results = results + "T"
        }
    }
    return results;
}

export function findIndex(ns: NS, flips: string, results: string): number {

    let count: number = 0; 
    let start: number = 0;
    while (true){
        start = flips.indexOf(results, start) + 1;
        if (start > 0){
            count = count + 1;
        }
        else{
            ns.print(count);
            if (count != 1){
               return -1;
            }
            return flips.indexOf(results, 0);
        }
    }

}
