export async function main(ns: NS) {

    const banger: string = String(ns.args[0]);

    if (ns.getServerMoneyAvailable("home") < 600000000) return;

    ns.gang.setMemberTask(banger, "Train Combat");

    ns.gang.ascendMember(banger);

    ns.exec("gang/buy.ts", "home", 1, banger);
}