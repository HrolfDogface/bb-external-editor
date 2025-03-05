export async function main(ns: NS) {
    const target: string = String(ns.args[0]);
    const path: string [] = search(ns, "home", target);
    for(let i = 1; i < path.length; i++){
        //ns.tprint(path[i]);
        ns.singularity.connect(path[i]);
    }
    
    await ns.singularity.installBackdoor();
    
    for(let i = path.length - 1; i >= 0; i--){
        //ns.tprint(path[i]);
        ns.singularity.connect(path[i]);
    }

}

export function search(ns: NS, hostName: string, target: string) {

  const neighbor: string[] = ns.scan(hostName);
  if(hostName != "home"){    
    neighbor.splice(0, 1);
  }
  let neighborRet: string[];
  for (let i = 0; i < neighbor.length; i++) {
    if (neighbor[i] == target) {
      return [hostName, target]
    }
    neighborRet = search(ns, neighbor[i], target);
    if (neighborRet.length > 1){
       neighborRet.unshift(hostName);
       return neighborRet;
    }
  }
  return [];
}