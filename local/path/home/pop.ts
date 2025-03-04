export async function main(ns: NS) {
  pop(ns, String(ns.args[0]));
}


export function pop(ns: NS, target: string): boolean {

  const portsRequired: number = ns.getServer(target).numOpenPortsRequired;

  // If we have the BruteSSH.exe program, use it to open the SSH Port
  // on the target server
  if(portsRequired > 0){
    if (ns.fileExists("BruteSSH.exe", "home")) {
      ns.brutessh(target);
    } else{
      if(!ns.singularity.purchaseTor()){
        ns.toast("Not enough money to purchase Tor router", "warning", null);
        return false;
      }
      if(!ns.singularity.purchaseProgram("BruteSSH.exe")){
        ns.toast("Not enough money to purchase BruteSSH.exe", "warning", null);
        return false;
      }
    }
  }

  if (portsRequired > 1){
    if (ns.fileExists("FTPCrack.exe", "home")) {
      ns.ftpcrack(target);
    } else{
      if(!ns.singularity.purchaseTor()){
        ns.toast("Not enough money to purchase Tor router", "warning", null);
        return false;
      }
      if(!ns.singularity.purchaseProgram("FTPCrack.exe")){
        ns.toast("Not enough money to purchase FTPCrack.exe", "warning", null);
        return false;
      }
    }
  }

  if (portsRequired > 2){
    if (ns.fileExists("relaySMTP.exe", "home")) {
      ns.relaysmtp(target);
    } else{
      if(!ns.singularity.purchaseTor()){
        ns.toast("Not enough money to purchase Tor router", "warning", null);
        return false;
      }
      if(!ns.singularity.purchaseProgram("relaySMTP.exe")){
        ns.toast("Not enough money to purchase relaySMTP.exe", "warning", null);
        return false;
      }
    }
  }

  if (portsRequired > 3){
    if (ns.fileExists("HTTPWorm.exe", "home")) {
      ns.httpworm(target);
    } else{
      if(!ns.singularity.purchaseTor()){
        ns.toast("Not enough money to purchase Tor router", "warning", null);
        return false;
      }
      if(!ns.singularity.purchaseProgram("HTTPWorm.exe")){
        ns.toast("Not enough money to purchase HTTPWorm.exe", "warning", null);
        return false;
      }
    }
  }

  if (portsRequired > 4){
    if (ns.fileExists("SQLInject.exe", "home")) {
      ns.sqlinject(target);
    } else{
      if(!ns.singularity.purchaseTor()){
        ns.toast("Not enough money to purchase Tor router", "warning", null);
        return false;
      }
      if(!ns.singularity.purchaseProgram("SQLInject.exe")){
        ns.toast("Not enough money to purchase SQLInject.exe", "warning", null);
        return false;
      }
    }
  }

  // Get root access to target server
  ns.nuke(target);
  return true;

}

export function test(ns: NS, message: string){
  ns.toast(message, "warning", null);
}