/** @param {NS} ns */
export async function main(ns) {
  while (true) {
    let hostName = ns.getHostname();

    while (ns.getServerMoneyAvailable(hostName) < (ns.getServerMaxMoney(hostName) * 0.5)) {
      await ns.grow(hostName);
      if (ns.getServerSecurityLevel(hostName) > (ns.getServerMinSecurityLevel(hostName) * 2)) await ns.weaken(hostName);
    }

    if (ns.getServerSecurityLevel(hostName) > (ns.getServerMinSecurityLevel(hostName) * 2)) await ns.weaken(hostName);

    await ns.hack(hostName);
  }
}