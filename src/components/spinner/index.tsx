import React, {useEffect, useState} from 'react';

interface ISpinner {
    spinClicked: number;
    handlePositions(position: number): void;
    reel?: number;
    customPosition: number;
}

const Spinner: React.FC<ISpinner> = ({spinClicked, handlePositions, reel, customPosition}) => {

    const [backgroundPosition, setBGP] = useState(0);

    useEffect(() => {
        setBGP(0);

        if(spinClicked) {

        }

        setTimeout(()=>{
            let randomNum = customPosition ? (500 * Math.round((Math.random() * 3 + 10)) + customPosition) : Math.floor(Math.random() * 200) * 50;
            setBGP(randomNum);
            handlePositions(randomNum);
        },0);

    }, [spinClicked]);
    // console.log(backgroundPosition);

    return (
        <div className={`spinner ${reel === 2 ? 'second' : reel === 3 ? 'third' : ''} ${!backgroundPosition ? 'no-transition' : ''}`}
             style={{backgroundPositionY: backgroundPosition + 'px'}}>

        </div>
    )
};

export default Spinner;
