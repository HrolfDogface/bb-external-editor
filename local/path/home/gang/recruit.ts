export async function main(ns: NS) {

    if (!ns.gang.canRecruitMember()) return;
    if (ns.getServerMoneyAvailable("home") < 600000000) return;

    const names: string[] = ["Lord Emp",
                                "Spartan",
                                "Grifter",
                                "Voodo",
                                "Zealot",
                                "Maul",
                                "Warblade",
                                "Void",
                                "Mr. Majestic",
                                "Savant",
                                "Ladytron",
                                "Condition Red",
                                "Mythos",
                                "Sister Eve",
                                "Agent Wax",
                                "Edwin Dolby",
                                "C.C. Rendozzo",
                                "The Beef Boys",
                                "Nemesis",
                                "Backlash",
                                "Christine Trelane",
                                "Deathblow",
                                "Engineer",
                                "Flint",
                                "Freefall",
                                "The High",
                                "Jack Hawksmoor",
                                "Apollo",
                                "Doctor",
                                "Jenny Quantum",
                                "Jenny Sparks",
                                "Midnighter",
                                "Rose Tattoo"];

    const bangers: string[] = ns.gang.getMemberNames();

    const unusedNames: string[] = names.filter(name => !bangers.includes(name));

    const banger = unusedNames[Math.floor(Math.random() * unusedNames.length)];

    ns.gang.recruitMember(banger);

    ns.gang.setMemberTask(banger, "Train Combat");

    ns.exec("gang/buy.ts", "home", 1, banger);
}