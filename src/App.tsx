import React, {useEffect, useRef, useState} from 'react';
import * as Yup from 'yup';
import Spinner from "./components/spinner";
import {checkCoordinates, handleCoordinates, isSet} from "./helpers/methods";
import DebugArea from "./components/debug-area";
import {Form, Formik} from "formik";
import {reels, reelsPositions} from "./helpers/constants";

export interface IInitialValues {
    fixed: string[],
    position: string;
    item: string;
}

export interface IInitialWinnerState {
    winnerLines: {reels: reels; reelsPosition: reelsPositions}[],
    pointsWon: number,
    // position: string,
}

export const fixedValue = 'yes';

const App: React.FC = () => {

    const [spinClicked, setSpinnedCount] = useState(0);
    const [positions, setPositions] = useState([] as number[]);
    const [disabled, setDisabled] = useState(false);


    const positionsRef = useRef(positions);
    positionsRef.current = positions;

    const handleSpinClick = () => {
        setSpinnedCount(prevState => ++prevState);
        setDisabled(true);
        setBalanceVal(prevState => prevState && --prevState);

        // 2 seconds takes to finish the animation of the reels.
        setTimeout(() => {
            checkWin();
        }, 2000);
    };

    const handlePositions = (number: number) => {
        if (spinClicked) {
            setPositions(prevState => [...prevState, number])
        }
    };

    const initialWinnerState = {
        winnerLines: [] as {reels: reels; reelsPosition: reelsPositions}[],
        pointsWon: 0,
    };

    const [winnerState, setWinnerState] = useState(initialWinnerState);

    const [winnerLine, setWinnerLine] = useState<number>();

    const checkWin = () => {
        let winner = checkCoordinates(positionsRef.current);

        if(winner) {
            setWinnerState(() => ({
                winnerLines: (winner as IInitialWinnerState).winnerLines,
                pointsWon: (winner as IInitialWinnerState).pointsWon,
            }));
            setBalanceVal(prevState => {
                if(typeof prevState === "string") {
                    return (winner as IInitialWinnerState).pointsWon
                } else {
                    return prevState + (winner as IInitialWinnerState).pointsWon
                }
            })
        }
        setPositions([]);
        setDisabled(false);
    };

    const getInitialBlinkingState = () => {
        return {
            'bar': {shouldBlink: false},
            '2bar': {shouldBlink: false},
            '3bar': {shouldBlink: false},
            '7': {shouldBlink: false},
            'cherrytop': {shouldBlink: false},
            'cherrymiddle': {shouldBlink: false},
            'cherrybottom': {shouldBlink: false},
            '7cherry': {shouldBlink: false},
            'bars': {shouldBlink: false},
        };
    };

    const [reels, setBlinking] = useState(getInitialBlinkingState());

    useEffect(() => {
        let {winnerLines} = winnerState;

        if(winnerLines.length) {

            let clonedWinner = JSON.parse(JSON.stringify(winnerLines));

            let selector: any;

            setWinnerLine(winnerLines.length);
            winnerLines.map((item, index) => {
                if (item.reels === 'cherry') {
                    clonedWinner.splice(index, 1);
                    selector = item.reels + item.reelsPosition
                }
                return item
            });

            if(winnerLines.length > 1) {
                if (selector) {
                    setBlinking(prevState => {
                        return {
                            ...prevState,
                            [selector]: {shouldBlink: true},
                            [clonedWinner[0]['reels']]: {shouldBlink: true}
                        }
                    })
                } else {
                    setBlinking(prevState => {
                        return {
                            ...prevState,
                            [clonedWinner[0]['reels']]: {shouldBlink: true},
                            [clonedWinner[1]['reels']]: {shouldBlink: true},
                        }
                    })
                }
            }

            if(winnerLines.length === 1) {
                if (selector) {
                    setBlinking(prevState => {
                        return {
                            ...prevState,
                            [selector]: {shouldBlink: true}
                        }
                    })
                } else {
                    setBlinking(prevState => {
                        return {
                            ...prevState,
                            [clonedWinner[0]['reels']]: {shouldBlink: true},
                        }
                    })
                }
            }

            setTimeout(() => {
                setBlinking(getInitialBlinkingState());
                setWinnerLine(0);
            }, 2000);

        }
    },[winnerState.winnerLines]);

    const [balanceVal, setBalanceVal] = useState<number | ''>(10);

    const initialValues = {
        fixed: [] as string[],
        position: '',
        item: '',
    };

    const validationSchema = Yup.object().shape<IInitialValues>({
        fixed: Yup.array().of(Yup.string().required()),
        item: Yup.string().when('fixed', {
            is: value => ~value.indexOf(fixedValue),
            then: Yup.string().required()
        }),
        position: Yup.string().when('fixed', {
            is: value => ~value.indexOf(fixedValue),
            then: Yup.string().required()
        }),
    });

    const [customPosition, setCustomPosition] = useState(0);

    return (
        <div className="App flex">
            <Formik
                initialValues={initialValues}
                onSubmit={(values: IInitialValues, {setSubmitting}) => {
                    setSubmitting(true);
                    if(values.fixed.toString() === fixedValue) {
                        setCustomPosition(handleCoordinates(values.item as reels, values.position as reelsPositions));
                    } else {
                        setCustomPosition(0);
                    }
                    handleSpinClick();
                    setSubmitting(false);
                }}
                validationSchema={validationSchema}
            >
                {({errors, touched, values, handleChange, isSubmitting, handleReset}) => (
                    <Form>
                        <DebugArea values={values} errors={errors}/>

                        <div className="flex m-t-20">
                            <label>
                                Your balance <input type="number" value={balanceVal}
                                                    onChange={(e) => {
                                                        let parsedVal = parseInt(e.target.value);
                                                        if (parsedVal > 5000 || parsedVal < 0) {
                                                            return;
                                                        }
                                                        setBalanceVal(parsedVal || '')
                                                    }}/>
                            </label>
                            <div className={`flex spinner-container ${winnerLine === 1 ? 'middle-line' : winnerLine === 2 ? 'top-bottom-line' : ''}`}>
                                <Spinner spinClicked={spinClicked}
                                         customPosition={customPosition}
                                         handlePositions={handlePositions}/>
                                <Spinner spinClicked={spinClicked}
                                         customPosition={customPosition}
                                         handlePositions={handlePositions} reel={2}/>
                                <Spinner spinClicked={spinClicked}
                                         customPosition={customPosition}
                                         handlePositions={handlePositions} reel={3}/>
                            </div>

                            <button type='submit' disabled={disabled || !balanceVal || isSubmitting}>
                                Spin
                            </button>
                        </div>

                        <ul>
                            <li className={`${reels['cherrytop'].shouldBlink ? 'blink' : ''}`}>3 CHERRY symbols on top line 2000</li>
                            <li className={`${reels['cherrymiddle'].shouldBlink ? 'blink' : ''}`}>3 CHERRY symbols on center line 1000</li>
                            <li className={`${reels['cherrybottom'].shouldBlink ? 'blink' : ''}`}>3 CHERRY symbols on bottom line 4000</li>
                            <li className={`${reels['7'].shouldBlink ? 'blink' : ''}`}>3 7 symbols on any line 150</li>
                            <li className={`${reels['7cherry'].shouldBlink ? 'blink' : ''}`}>Any combination of CHERRY and 7 on any line 75</li>
                            <li className={`${reels['3bar'].shouldBlink ? 'blink' : ''}`}>3 3xBAR symbols on any line 50</li>
                            <li className={`${reels['2bar'].shouldBlink ? 'blink' : ''}`}>3 2xBAR symbols on any line 20</li>
                            <li className={`${reels['bar'].shouldBlink ? 'blink' : ''}`}>3 BAR symbols on any line 10</li>
                            <li className={`${reels['bars'].shouldBlink ? 'blink' : ''}`}>Combination of any BAR symbols on any line 5</li>
                        </ul>

                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default App;
