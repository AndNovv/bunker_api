import { PlayerStats, bodyTypes, healthConditions, hobbies, interestingFacts, professions, traits } from "./data";


const data: [typeof healthConditions, typeof professions, typeof bodyTypes, typeof hobbies, typeof traits, typeof interestingFacts] = [healthConditions, professions, bodyTypes, hobbies, traits, interestingFacts]

let dataArrayLength = 0

data.map((array) => {
    dataArrayLength += array.length
})

const CurrentCombined: Record<PlayerStats, number> = {
    'Food Consumption': 0,
    'Intelligence': 0,
    'Med': 0,
    'Med Consumption': 0,
    'Phisics': 0,
    'Psycho': 0,
    'Social': 0,
    'Tech': 0,
};

export const Average: Record<PlayerStats, number> = {
    'Food Consumption': 0,
    'Intelligence': 0,
    'Med': 0,
    'Med Consumption': 0,
    'Phisics': 0,
    'Psycho': 0,
    'Social': 0,
    'Tech': 0,
};

const calculate = (array: typeof data[number]) => {
    array.map((el) => {
        el.effect.map((statEffect) => {
            CurrentCombined[statEffect.stat] += statEffect.value
        })
    })

    console.log(CurrentCombined)
    for (const key in CurrentCombined) {
        Average[key as PlayerStats] += CurrentCombined[key as PlayerStats] / array.length
        CurrentCombined[key as PlayerStats] = 0
    }
}

data.map((charDataArray) => {
    calculate(charDataArray)
})


console.log("Полная информация")
console.log(Average)