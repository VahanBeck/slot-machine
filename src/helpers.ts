export function isEven(n: number) {
    return n % 2 === 0;
}

export function modulus500(n: number) {
    return n % 500;
}

export function handleCoordinates(item: string, position: string): number {

    let customPosition: number = 0;

    let evaluatePosition = (coordinate: number) => {
        if(position === 'top') {
            customPosition = coordinate
        } else if(position === 'middle') {
            customPosition = coordinate + 50
        } else {
            customPosition = coordinate + 100
        }
    };

    switch (item) {
        case 'bar':
            evaluatePosition(400);
            break;
        case '2bar':
            evaluatePosition(300);
            break;
        case '3bar':
            evaluatePosition(500);
            break;
        case '7':
            evaluatePosition(200);
            break;
        case 'cherry':
            evaluatePosition(100);
            break;
        default:
            console.error("Didn't match any item from the reel check your reel items!!!")
    }
    return customPosition
}
