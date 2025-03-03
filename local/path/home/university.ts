export async function main(ns: NS, targetLevel: number) {

    ns.singularity.universityCourse(ns.enums.LocationName.Sector12RothmanUniversity, ns.enums.UniversityClassType.algorithms);

    while(ns.getHackingLevel() < targetLevel)
    {        
        await ns.sleep(10000);
    }

}