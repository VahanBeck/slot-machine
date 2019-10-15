import {points, positions, reelPositions, reels, reelsPositions} from "./constants";

export function isEven(n: number): boolean {
    return n % 2 === 0;
}

export function modulus500(n: number): number {
    return n % 500;
}

export function handleCoordinates(item: reels, position: reelsPositions): number {
    return positions[item][position]
}

export function checkCoordinates([firstReel, secondReel, thirdReel]: number[]): {} | null {

    let evenCheck = isEven(firstReel / 50);

    let [firstReelModulus, secondReelModulus, thirdReelModulus,] = [
        modulus500(firstReel),
        modulus500(secondReel),
        modulus500(thirdReel)
    ];

    let cherry7ArrTop = [positions['7']['top'], positions['cherry']['top']];
    let cherry7ArrMiddle = [positions['7']['middle'], positions['cherry']['middle']];
    let cherry7ArrBottom = [positions['7']['bottom'], positions['cherry']['bottom']];

    let barsArrTop = [positions['bar']['top'], positions['2bar']['top'], positions['3bar']['top']];
    let barsArrMiddle = [positions['bar']['middle'], positions['2bar']['middle'], positions['3bar']['middle']];
    let barsArrBottom = [positions['bar']['bottom'], positions['2bar']['bottom'], positions['3bar']['bottom']];

    const IsInArray = (arr: number[]) => {
        return ~arr.indexOf(firstReelModulus) && ~arr.indexOf(secondReelModulus) && ~arr.indexOf(thirdReelModulus)
    };

    if ((evenCheck === isEven(secondReel / 50)) && (evenCheck === isEven(thirdReel / 50))) {
        if ((firstReelModulus === secondReelModulus) && (firstReelModulus === thirdReelModulus)) {
            return checkPointsWon(firstReelModulus, 'top');
        } else if (IsInArray(cherry7ArrTop)) {
            return checkPointsWon('cherry7', 'top');
        } else if (IsInArray(cherry7ArrMiddle)) {
            return checkPointsWon('cherry7', 'middle');
        } else if (IsInArray(cherry7ArrBottom)) {
            return checkPointsWon('cherry7', 'bottom');
        } else if (IsInArray(barsArrTop)) {
            return checkPointsWon('bars', 'top');
        } else if (IsInArray(barsArrMiddle)) {
            return checkPointsWon('bars', 'middle');
        } else if (IsInArray(barsArrBottom)) {
            return checkPointsWon('bars', 'bottom');
        }
    }
    return null;
}

const checkPointsWon = (coordinate: number | string, position: string): {} => {

    let pointsWon = 0;
    let winnerLines: any[] = [];

    if(coordinate === 'cherry7' || coordinate === 'bars') {
        winnerLines.push({reels: coordinate, reelsPosition: position});
        //@ts-ignore
        pointsWon += points[coordinate][position]
    } else {

        const itemsAtCoordinate = reelPositions[coordinate];

        Object.entries(itemsAtCoordinate)
            .forEach(([key, val]) => {
                winnerLines.push({reels: val, reelsPosition: key});
                //@ts-ignore
                pointsWon += points[val][key];
            });
    }
    return {pointsWon, winnerLines}
};

export function isSet(e: any) {

    if (e === 0 || !!e) {

        if (typeof e === "object") {
            if (isSet(e.toArray))
                e = e.toArray();
            return !!(Object.keys(e).length);
        }

        return true;
    }
    else
        return false;
}
