export async function main(ns: NS, crime: string) {

    
    while(ns.singularity.getCrimeChance(ns.enums.CrimeType[crime]) < 100)
    {        
        ns.singularity.gymWorkout(ns.enums.LocationName.Sector12PowerhouseGym, ns.enums.GymType.agility);
        await ns.sleep(60000);     
        ns.singularity.gymWorkout(ns.enums.LocationName.Sector12PowerhouseGym, ns.enums.GymType.defense);
        await ns.sleep(60000);     
        ns.singularity.gymWorkout(ns.enums.LocationName.Sector12PowerhouseGym, ns.enums.GymType.dexterity);
        await ns.sleep(60000);     
        ns.singularity.gymWorkout(ns.enums.LocationName.Sector12PowerhouseGym, ns.enums.GymType.strength);
        await ns.sleep(60000);
    }

    ns.singularity.commitCrime(ns.enums.CrimeType[crime])

}