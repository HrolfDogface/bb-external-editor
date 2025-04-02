export async function main(ns: NS) {

    const names: string[] = [
        ns.enums.FactionName.Tetrads,
        ns.enums. FactionName.TheSyndicate,
        ns.enums.FactionName.TheDarkArmy,
        ns.enums.FactionName.SpeakersForTheDead,
        ns.enums.FactionName.NiteSec,
        ns.enums.FactionName.TheBlackHand];

    let minChance = 1;
    for (const name of names){
        const chance = ns.gang.getChanceToWinClash(name);
        if(minChance > chance) minChance = chance;
    }

    if (minChance < 0.55) {
        ns.gang.setTerritoryWarfare(false);
    }else {
        ns.gang.setTerritoryWarfare(true);
    }

}