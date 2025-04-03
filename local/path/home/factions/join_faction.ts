export async function main(ns: NS) {

    const faction: string = String(ns.args[0]);
    
    if (!ns.peek(12) && (faction != "Slum Snakes") ) {        
        ns.writePort(ns.pid, false);
        return;
    }
    if(ns.singularity.joinFaction(faction)){
        ns.writePort(ns.pid, true);
    }else if(ns.getPlayer().factions.includes(faction)){
        ns.writePort(ns.pid, true);
    }else {
        ns.writePort(ns.pid, false);
    }

}