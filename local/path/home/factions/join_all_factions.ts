export async function main(ns: NS) {
    if (ns.peek(11)){
        if (ns.getServerMoneyAvailable("home") > 50000000){
            ns.clearPort(11);
            ns.writePort(11, false);
            ns.singularity.travelToCity(ns.enums.CityName.Aevum);
            await ns.sleep(2000);
            ns.singularity.travelToCity(ns.enums.CityName.Chongqing);
            await ns.sleep(2000);
            ns.singularity.travelToCity(ns.enums.CityName.Ishima);
            await ns.sleep(2000);
            ns.singularity.travelToCity(ns.enums.CityName.NewTokyo);
            await ns.sleep(2000);
            ns.singularity.travelToCity(ns.enums.CityName.Volhaven);
            await ns.sleep(2000);
            ns.singularity.travelToCity(ns.enums.CityName.Sector12);
        }
    }

    const invitations: string [] = ns.singularity.checkFactionInvitations();

    for (let i = 0; i < invitations.length; i++){
        if ((!ns.peek(12)) && (invitations[i] != "Slum Snakes")) continue;

        if(invitations[i] == "NiteSec"){          
            ns.singularity.joinFaction(invitations[i]);
        }
        
        const ownedAugs: string [] = ns.singularity.getOwnedAugmentations(true);
        const augmentations: string [] = ns.singularity.getAugmentationsFromFaction(invitations[i]);

        for (let j = 0; j<augmentations.length;j++){

            if (ownedAugs.includes(augmentations[j])){
                continue;
            }
            ns.singularity.joinFaction(invitations[i]);
            break;
        }
    }

}