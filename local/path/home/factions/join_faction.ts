export async function main(ns: NS) {

    const faction: string = String(ns.args[0]);
    if(ns.singularity.joinFaction(faction)){
        ns.writePort(ns.pid, true);
    }else if(ns.singularity.getFactionRep(faction) > 0){
        ns.writePort(ns.pid, true);
    }else {
        ns.writePort(ns.pid, false);
    }

}