export async function main(ns: NS, targetLevel: number) {

    ns.singularity.universityCourse(ns.enums.LocationName.Sector12RothmanUniversity, "Algorithms");

    while(ns.getHackingLevel() < targetLevel)
    {        
        await ns.sleep(10000);
    }

}