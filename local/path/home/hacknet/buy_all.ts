export async function main(ns: NS) {

    while(ns.hacknet.numNodes() < ns.hacknet.maxNumNodes()){
        if(ns.getServerMoneyAvailable("home") > ns.hacknet.getPurchaseNodeCost()){
            ns.hacknet.purchaseNode();
        }else{
            break;
        }
    }

    let nodeIndexes: number[] = [];
    for(let i = 0; i < ns.hacknet.numNodes(); i++){
        nodeIndexes.push(i);
    }

    nodeIndexes = nodeIndexes.sort(function (a, b) { return ns.hacknet.getNodeStats(a).level - ns.hacknet.getNodeStats(b).level; });

    for (const i of nodeIndexes){
        while(ns.getServerMoneyAvailable("home") > ns.hacknet.getRamUpgradeCost(i)){
            ns.hacknet.upgradeRam(i);
        }
        while(ns.getServerMoneyAvailable("home") > ns.hacknet.getLevelUpgradeCost(i)){
            ns.hacknet.upgradeLevel(i);
        }
        while(ns.getServerMoneyAvailable("home") > ns.hacknet.getCoreUpgradeCost(i)){
            ns.hacknet.upgradeCore(i);
        }
        while(ns.getServerMoneyAvailable("home") > ns.hacknet.getCacheUpgradeCost(i)){
            ns.hacknet.upgradeCache(i);
        }
        await ns.sleep(1000);
    }
}