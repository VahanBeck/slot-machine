import React, {useEffect, useRef, useState} from 'react';
import * as Yup from 'yup';
import Spinner from "./components/spinner";
import {handleCoordinates, isEven, modulus500} from "./helpers";
import DebugArea from "./components/debug-area";
import {Form, Formik} from "formik";

export interface IInitialValues {
    fixed: string[],
    position: string;
    item: string;
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
        }, 100);
    };

    const handlePositions = (number: number) => {
        if (spinClicked) {
            setPositions(prevState => [...prevState, number])
        }
    };

    const checkWin = () => {

        setPositions([]);
        setDisabled(false);
    };

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
                    console.log(values);
                    if(values.fixed.toString() === fixedValue) {
                        setCustomPosition(handleCoordinates(values.item, values.position));
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
                        {/*<fieldset>
                            {JSON.stringify(errors)}
                            {JSON.stringify(values)}
                        </fieldset>*/}
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
                            <Spinner spinClicked={spinClicked}
                                     customPosition={customPosition}
                                     handlePositions={handlePositions}/>
                            <Spinner spinClicked={spinClicked}
                                     customPosition={customPosition}
                                     handlePositions={handlePositions} reel={2}/>
                            <Spinner spinClicked={spinClicked}
                                     customPosition={customPosition}
                                     handlePositions={handlePositions} reel={3}/>
                            <button type='submit' disabled={disabled || !balanceVal || isSubmitting}>
                                Spin
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default App;
