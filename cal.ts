let pick: number = 0;
let sum: number = 0;

interface Data {
    name: string;
    value: number;
    max: number;
    lv: number;
}

let DATA: Array<Data> = [
    { name: "Might", value: 200, max: 5, lv: 0 },
    { name: "Armor", value: 600, max: 3, lv: 0 },
    { name: "Max_Health", value: 200, max: 3, lv: 0 },
    { name: "Recovery", value: 200, max: 5, lv: 0 },
    { name: "Cooldown", value: 900, max: 2, lv: 0 },
    { name: "Area", value: 300, max: 2, lv: 0 },
    { name: "Speed", value: 300, max: 2, lv: 0 },
    { name: "Duration", value: 300, max: 2, lv: 0 },
    { name: "Amount", value: 5000, max: 1, lv: 0 },
    { name: "MoveSpeed", value: 300, max: 2, lv: 0 },
    { name: "Magnet", value: 300, max: 2, lv: 0 },
    { name: "Luck", value: 600, max: 3, lv: 0 },
    { name: "Growth", value: 900, max: 5, lv: 0 },
    { name: "Greed", value: 200, max: 5, lv: 0 },
    { name: "Revival", value: 10000, max: 1, lv: 0 },
    { name: "Reroll", value: 5000, max: 2, lv: 0 },
    { name: "Skip", value: 1000, max: 1, lv: 0 },
    { name: "Curse", value: 1666, max: 5, lv: 0 },
];

const calLevelUpNeed = (
    baseSkillValue: number,
    baseSkillLevel: number,
    pick: number,
): number => {
    return baseSkillValue * ((pick - 1) / 10 + 1) * baseSkillLevel;
};

const pickSkill = (
    name: string,
    baseSkillValue: number,
    targetLv: number,
): void => {
    let price: number = 0;
    for (let index = 1; index <= targetLv; index++) {
        price += calLevelUpNeed(baseSkillValue, index, ++pick);
    }
    console.log(
        "Level up Skill :",
        name,
        ", targetLv",
        targetLv,
        ", spand",
        price,
    );
    sum += price;
    // console.log("need ", sum);
};

interface calItem {
    cost: number;
    name: string;
    index: number;
    max: number;
    lv: number;
}
const calAllSkills = (): void => {
    for (let index = 0; index < DATA.length; index++) {
        let upList: Array<calItem> = [];
        DATA.forEach((element, index) => {
            if (element.lv != element.max) {
                let item = {
                    cost: element.value,
                    name: element.name,
                    index: index,
                    max: element.max,
                    lv: 0,
                };
                upList.push(item);
            }
        });
        upList = upList.sort((a, b) => {
            const aFirst =
                MULTIPLIER[0][a.max - 1] * a.cost +
                MULTIPLIER[a.max][b.max - 1] * b.cost;
            const bFirst =
                MULTIPLIER[0][b.max - 1] * b.cost +
                MULTIPLIER[b.max][a.max - 1] * a.cost;
            if (aFirst > bFirst) {
                return 1;
            } else if (aFirst < bFirst) {
                return -1;
            }
            return 0;
        });
        let upSkill: calItem | undefined = upList[0];
        if (typeof upSkill !== "undefined") {
            pickSkill(upSkill.name, upSkill.cost, upSkill.max);
            DATA[upSkill.index].lv = DATA[upSkill.index].max;
        }
    }
};

const MULTIPLIER: Array<Array<number>> = [];
const MAX_AMOUNT: number = 5;

for (let offset = 0; offset <= MAX_AMOUNT; offset++) {
    const row = [];
    let last = 0;
    for (let amnt = 1; amnt <= MAX_AMOUNT; amnt++) {
        last += ((offset + amnt - 1) / 10 + 1) * amnt;
        row.push(last);
    }
    MULTIPLIER.push(row);
}

calAllSkills();
