import { PortNumber } from "./../port_enum";
import { Phase } from "./../port_enum";

export async function main(ns: NS) {
    while(!ns.gang.inGang()){
        ns.exec("factions/join_all_factions.ts", "home", 1);
        if(!ns.gang.createGang("Slum Snakes")){
            await ns.sleep(60000);
        }
    }
   
    if(ns.peek(PortNumber.phase) == Phase.murderParty){
        ns.clearPort(PortNumber.phase);
        ns.writePort(PortNumber.phase, Phase.buyRam);

        ns.clearPort(PortNumber.sleeveTask);
        ns.writePort(PortNumber.sleeveTask, "uni");

        ns.clearPort(PortNumber.joinFlag);
        ns.writePort(PortNumber.joinFlag, true);
        
        ns.exec("factions/join_all_factions.ts", "home", 1);
        await ns.sleep(15000);
        
    }

    

    let previouesPower: number = ns.gang.getGangInformation().power;
    let tickNumber: number = 10;
    let task: string = "Terrorism";
    
    const ownedAugs: string [] = ns.singularity.getOwnedAugmentations(false);
    const augmentations: string [] = ns.singularity.getAugmentationsFromFaction("Slum Snakes");
    const unownedCount = augmentations.filter(name => !ownedAugs.includes(name)).length;
    if (unownedCount < 2){ 
        task = "Traffick Illegal Arms";
        if(ns.peek(PortNumber.phase) == Phase.gangGang){
            ns.clearPort(PortNumber.phase);
            ns.writePort(PortNumber.phase, Phase.stackNFG);
            ns.exec("soft_reset.ts", "home", 1);

        }

    }

    while(true){
        await ns.gang.nextUpdate();

        const power: number = ns.gang.getGangInformation().power;

        if (power != previouesPower){
            previouesPower = power;
            tickNumber = 0;
        }

        if (ns.gang.getMemberNames().length < 12){
            ns.exec("gang/recruit.ts", "home", 1);
        }else if(ns.peek(PortNumber.phase) == Phase.gangStartup1){
            ns.clearPort(PortNumber.phase);
            ns.writePort(PortNumber.phase, Phase.gangStartup2);
            ns.exec("soft_reset.ts", "home", 1);
        }

        
        
        ns.exec("gang/ascend_all.ts", "home", 1);

        if (tickNumber >= 9){
            ns.exec("gang/set_tasks.ts", "home", 1, "Territory Warfare");
        } else{
            ns.exec("gang/set_tasks.ts", "home", 1, task);
        }

        tickNumber++;

        ns.exec("gang/war.ts", "home", 1);

        if((ns.peek(PortNumber.phase) == Phase.gangStartup2)||(ns.peek(PortNumber.phase) == Phase.gangStartup1)){

            for(const banger of ns.gang.getMemberNames()){
                ns.exec("gang/buy.ts", "home", 1, banger);
                await ns.sleep(100);
            }
            if (ns.getServerMoneyAvailable("home") < 9400000000){
                ns.exec("gang/set_tasks.ts", "home", 1, task);
                await ns.sleep(100); 
                ns.exec("proto_installer.ts", "home", 1, 1);
                await ns.sleep(1000);
                ns.exec("soft_reset.ts", "home", 1);
                await ns.sleep(100);
            }
        }
        if(ns.peek(PortNumber.phase) == Phase.gangStartup2){
            ns.clearPort(PortNumber.phase);
            ns.writePort(PortNumber.phase, Phase.gangGang);
            ns.exec("soft_reset.ts", "home", 1);
        }

    }
}