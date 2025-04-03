export async function main(ns: NS) {

    while(true){
        for(let i = 0; i < ns.sleeve.getNumSleeves(); i++){
            const sleeve = ns.sleeve.getSleeve(i);
            if (sleeve.shock > 98){
                ns.sleeve.setToShockRecovery(i);
                continue;
            }
            if(ns.peek(13) == "gym"){
                switch (i){
                    case 0:
                    case 4:
                        ns.sleeve.setToGymWorkout(i, ns.enums.LocationName.Sector12PowerhouseGym, ns.enums.GymType.agility);
                        break;
                    case 1:
                    case 5:
                        ns.sleeve.setToGymWorkout(i, ns.enums.LocationName.Sector12PowerhouseGym, ns.enums.GymType.defense);
                    break;
                    case 2:
                    case 6:
                        ns.sleeve.setToGymWorkout(i, ns.enums.LocationName.Sector12PowerhouseGym, ns.enums.GymType.dexterity);
                        break;
                    case 3:
                    case 7:
                        ns.sleeve.setToGymWorkout(i, ns.enums.LocationName.Sector12PowerhouseGym, ns.enums.GymType.strength);
                        break;
                }
                continue;
            }
            if(ns.peek(13) == "murder"){
                if(sleeve.skills.agility > 60){
                    ns.sleeve.setToCommitCrime(i, ns.enums.CrimeType.homicide);
                }else{
                    switch (i){
                        case 0:
                        case 4:
                            ns.sleeve.setToGymWorkout(i, ns.enums.LocationName.Sector12PowerhouseGym, ns.enums.GymType.agility);
                            break;
                        case 1:
                        case 5:
                            ns.sleeve.setToGymWorkout(i, ns.enums.LocationName.Sector12PowerhouseGym, ns.enums.GymType.defense);
                        break;
                        case 2:
                        case 6:
                            ns.sleeve.setToGymWorkout(i, ns.enums.LocationName.Sector12PowerhouseGym, ns.enums.GymType.dexterity);
                            break;
                        case 3:
                        case 7:
                            ns.sleeve.setToGymWorkout(i, ns.enums.LocationName.Sector12PowerhouseGym, ns.enums.GymType.strength);
                            break;
                    }
                }
            }
            if(ns.peek(13) == "hesit"){
                ns.sleeve.setToCommitCrime(i, ns.enums.CrimeType.heist);
            }

        }

        await ns.sleep(30000);
    }

}