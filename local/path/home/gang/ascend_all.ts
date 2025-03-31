
export async function main(ns: NS) {

    for(const banger of ns.gang.getMemberNames()){
        const stats = ns.gang.getAscensionResult(banger);
        if((stats.agi > 1.5)||(stats.dex > 1.5)||(stats.str > 1.5)||(stats.def > 1.5)){
            ns.exec("gang/ascend.ts", "home", 1, banger);
            await ns.sleep(100);
        }
    }

}