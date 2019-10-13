import React, {useEffect, useState} from 'react';
import {Field, FieldProps} from "formik";
import {fixedValue, IInitialValues} from '../../App';

interface IDebugArea {
    values: any;
    errors: any;
}

const DebugArea: React.FC<IDebugArea> = ({values, errors, }) => {

    const [backgroundPosition, setBGP] = useState(0);

    useEffect(() => {

    }, []);
    // console.log(backgroundPosition);

    return (
        <>
            <Field name='fixed'>
                {({field, form}: FieldProps<IInitialValues>) => (
                    <label className={"ibx-checkbox "}>
                        <input
                            type="checkbox"
                            {...field}
                            checked={field.value.includes(fixedValue)}
                            onChange={() => {
                                if (field.value.includes(fixedValue)) {
                                    const nextValue = field.value.filter(
                                        (value: any) => value !== fixedValue
                                    );
                                    form.setFieldValue(field.name, nextValue);
                                } else {
                                    const nextValue = field.value.concat(fixedValue);
                                    form.setFieldValue(field.name, nextValue);
                                }
                            }}
                        />
                        <span><i className="icon-check"></i></span>
                        <span className="item-text">Fixed</span>

                    </label>
                )}
            </Field>

            <Field name='item'>
                {({field, form}: FieldProps<IInitialValues>) => (
                    <select {...field}>
                        <option value=''>Select an item</option>
                        <option value="bar">Bar</option>
                        <option value="2bar">2xBar</option>
                        <option value="3bar">3xBar</option>
                        <option value="7">7</option>
                        <option value="cherry">Cherry</option>
                    </select>
                )}
            </Field>

            <Field name='position'>
                {({field, form}: FieldProps<IInitialValues>) => (
                    <select {...field}>
                        <option value=''>Select a position</option>
                        <option value="top">Top</option>
                        <option value="middle">Middle</option>
                        <option value="bottom">Bottom</option>
                    </select>
                )}
            </Field>

        </>
    )
};

export default DebugArea;
