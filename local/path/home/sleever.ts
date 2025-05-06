export async function main(ns: NS) {

    while(true){
        for(let i = 0; i < ns.sleeve.getNumSleeves(); i++){
            const sleeve = ns.sleeve.getSleeve(i);
            if (sleeve.shock > 95){
                ns.sleeve.setToShockRecovery(i);
                continue;
            }
            const j = Math.round(Math.random() * 3)
            if(ns.peek(13) == "gym"){
                switch (j){
                    case 0:
                        ns.sleeve.setToGymWorkout(i, ns.enums.LocationName.Sector12PowerhouseGym, ns.enums.GymType.agility);
                        break;
                    case 1:
                        ns.sleeve.setToGymWorkout(i, ns.enums.LocationName.Sector12PowerhouseGym, ns.enums.GymType.defense);
                    break;
                    case 2:
                        ns.sleeve.setToGymWorkout(i, ns.enums.LocationName.Sector12PowerhouseGym, ns.enums.GymType.dexterity);
                        break;
                    case 3:
                        ns.sleeve.setToGymWorkout(i, ns.enums.LocationName.Sector12PowerhouseGym, ns.enums.GymType.strength);
                        break;
                }
                continue;
            }
            if(ns.peek(13) == "murder"){
                if(sleeve.skills.agility > 10){
                    ns.sleeve.setToCommitCrime(i, ns.enums.CrimeType.homicide);
                }//else if(sleeve.skills.strength > 35){
                 //   ns.sleeve.setToCommitCrime(i, ns.enums.CrimeType.mug);
                //}
                else {
                    switch (j){
                        case 0:
                            ns.sleeve.setToGymWorkout(i, ns.enums.LocationName.Sector12PowerhouseGym, ns.enums.GymType.agility);
                            break;
                        case 1:
                            ns.sleeve.setToGymWorkout(i, ns.enums.LocationName.Sector12PowerhouseGym, ns.enums.GymType.defense);
                        break;
                        case 2:
                            ns.sleeve.setToGymWorkout(i, ns.enums.LocationName.Sector12PowerhouseGym, ns.enums.GymType.dexterity);
                            break;
                        case 3:
                            ns.sleeve.setToGymWorkout(i, ns.enums.LocationName.Sector12PowerhouseGym, ns.enums.GymType.strength);
                            break;
                    }
                    continue;
                }
            }
            if(ns.peek(13) == "heist"){
                ns.sleeve.setToCommitCrime(i, ns.enums.CrimeType.heist);
            }
            if(ns.peek(13) == "uni"){
                ns.sleeve.setToUniversityCourse(i, ns.enums.LocationName.VolhavenZBInstituteOfTechnology, ns.enums.UniversityClassType.computerScience);
            }

        }

        await ns.sleep(30000);
    }

}