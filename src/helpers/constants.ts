export const points = {
    "bar": {
        top: 10,
        bottom: 10,
        middle: 10,
    },
    "2bar": {
        top: 20,
        bottom: 20,
        middle: 20,
    },
    "3bar": {
        top: 50,
        bottom: 50,
        middle: 50,
    },
    "cherry": {
        top: 2000,
        bottom: 1000,
        middle: 4000,
    },
    "7": {
        top: 150,
        bottom: 150,
        middle: 150,
    },
    "cherry7": {
        top: 75,
        bottom: 75,
        middle: 75,
    },
    "bars": {
        top: 5,
        bottom: 5,
        middle: 5,
    },

};

export const positions = {
    "bar": {
        top: 400,
        bottom: 500,
        middle: 450,
    },
    "2bar": {
        top: 300,
        bottom: 400,
        middle: 350,
    },
    "3bar": {
        top: 500,
        bottom: 100,
        middle: 50,
    },
    "7": {
        top: 200,
        bottom: 300,
        middle: 250,
    },
    "cherry": {
        top: 100,
        bottom: 200,
        middle: 150,
    },
};

export const reelPositions: any = {
    "0": {
        top: "3bar",
        bottom: "bar",
    },
    "100": {
        top: "cherry",
        bottom: "3bar",
    },
    "200": {
        top: "7",
        bottom: "cherry",
    },
    "300": {
        top: "2bar",
        bottom: "7",
    },
    "400": {
        top: "bar",
        bottom: "2bar",
    },
    "50": {
        middle: "3bar",
    },
    "150": {
        middle: "cherry",
    },
    "250": {
        middle: "7",
    },
    "350": {
        middle: "2bar",
    },
    "450": {
        middle: "bar",
    },
};

export type reelsPositions = "top" | "bottom" | "middle";
export type reels = "bar" | "2bar"  | "3bar"  | "7"  | "cherry" ;
