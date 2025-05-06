export async function main(ns: NS) {

    //ns.disableLog('ALL');
    //ns.ui.openTail();
    await ns.sleep(10000);
    let doc = eval('document');
    const headButton = doc.evaluate("//button[text() = 'Eat noodles']", doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (headButton !== null) {
      //ns.print("found head button!");
      while(true){
        await headButton[Object.keys(headButton)[1]].onClick({ isTrusted: true });
        await ns.sleep(10);
      }
    }

}