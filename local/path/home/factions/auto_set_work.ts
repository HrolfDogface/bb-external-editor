export async function main(ns: NS) {
    if (!ns.peek(12)) return;
    const factions: string[] = ["CyberSec", "Daedalus", "NiteSec", "The Black Hand", "BitRunners", "Sector-12", "Aevum", "Chongqing", "Ishima", "New Tokyo", "Tetrads", "Tian Di Hui", "Volhaven", "Slum Snakes"];

    for(let i = 0; i < factions.length; i++){
        if ((ns.singularity.getFactionRep(factions[i])>0) && ((ns.singularity.getFactionFavor(factions[i]) + ns.singularity.getFactionFavorGain(factions[i])) < ns.getFavorToDonate())){
            ns.singularity.workForFaction(factions[i],ns.singularity.getFactionWorkTypes(factions[i])[0]);
            break;
        }
    }

}