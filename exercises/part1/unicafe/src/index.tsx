import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Statistics } from './Statistics';
import { Button } from './Button';

type NumberHook = (arg: number) => void;

const addFeedBack = ({ review, reviewSetter }: { review: number; reviewSetter: NumberHook }) => () =>
    reviewSetter(review + 1);

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState<number>(0);
    const [neutral, setNeutral] = useState<number>(0);
    const [bad, setBad] = useState<number>(0);

    return (
        <>
            <h1>give feedback</h1>
            <Button onClick={addFeedBack({ review: good, reviewSetter: setGood })}>good</Button>
            <Button onClick={addFeedBack({ review: neutral, reviewSetter: setNeutral })}>neutral</Button>
            <Button onClick={addFeedBack({ review: bad, reviewSetter: setBad })}>bad</Button>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
