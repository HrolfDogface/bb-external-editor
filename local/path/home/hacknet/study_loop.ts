export async function main(ns: NS) {
    while(true){
        const hashCount = ns.hacknet.numHashes();
        const studyCost = ns.hacknet.hashCost("Improve Studying");
        const reduceCost = ns.hacknet.hashCost("Reduce Minimum Security");
        const increaseCost = ns.hacknet.hashCost("Increase Maximum Money");

        if(hashCount >= studyCost){
            ns.hacknet.spendHashes("Improve Studying");
        }
        if(hashCount >= reduceCost){
            //ns.hacknet.spendHashes("Reduce Minimum Security", String(ns.args[0]));
        }
        if(hashCount >= increaseCost){
            //ns.hacknet.spendHashes("Increase Maximum Money", String(ns.args[0]));
        }
        await ns.sleep(3000)
    }
}