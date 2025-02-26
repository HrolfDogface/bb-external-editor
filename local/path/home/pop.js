/** @param {NS} ns */
export async function main(ns) {

  let target = ns.args[0]

  // If we have the BruteSSH.exe program, use it to open the SSH Port
  // on the target server
  if (ns.fileExists("BruteSSH.exe", "home")) {
    ns.brutessh(target);
  }

  
  if (ns.fileExists("FTPCrack.exe", "home")) {
    ns.ftpcrack(target);
  }

  
  if (ns.fileExists("relaySMTP.exe", "home")) {
    ns.relaysmtp(target);
  }

  
  if (ns.fileExists("HTTPWorm.exe", "home")) {
    ns.httpworm(target);
  }

  
  if (ns.fileExists("SQLInject.exe", "home")) {
    ns.sqlinject(target);
  }

  // Get root access to target server
  ns.nuke(target);  

}