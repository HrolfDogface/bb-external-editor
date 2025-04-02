export async function main(ns: NS) {
    while(!ns.gang.inGang()){
        if(!ns.gang.createGang("Slum Snakes")){
            await ns.sleep(60000);
        }
    }
    ns.clearPort(12);
    //turn on auto work    
    ns.writePort(12, true);

    let previouesPower: number = ns.gang.getGangInformation().power;
    let tickNumber: number = 10;
    let task: string = "Terrorism";
    while(true){
        await ns.gang.nextUpdate();

        const power: number = ns.gang.getGangInformation().power;

        if (power != previouesPower){
            previouesPower = power;
            tickNumber = 0;
        }

        if (ns.gang.getMemberNames().length >= 12){
            //task = "Traffick Illegal Arms";
        }else {
            ns.exec("gang/recruit.ts", "home", 1);
        }
        
        ns.exec("gang/ascend_all.ts", "home", 1);

        if (tickNumber >= 9){
            ns.exec("gang/set_tasks.ts", "home", 1, "Territory Warfare");
        } else{
            ns.exec("gang/set_tasks.ts", "home", 1, task);
        }

        tickNumber++;

        ns.exec("gang/war.ts", "home", 1);

    }
}