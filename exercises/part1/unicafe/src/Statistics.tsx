import React from 'react';
import { Statistic } from './Statistic';

type Numbers = {
    good: number;
    neutral: number;
    bad: number;
};

type Sum = ({ good, neutral, bad }: Numbers) => number;

interface SumWithCb extends Numbers {
    getNumOfVotes: Sum;
}

const getNumOfVotes: Sum = ({ good, neutral, bad }) => good + neutral + bad;

const calcAverage = ({ good, neutral, bad, getNumOfVotes }: SumWithCb) =>
    (good - bad) / getNumOfVotes({ good, neutral, bad });

const calcPercentageOfPositive = ({ good, neutral, bad, getNumOfVotes }: SumWithCb) =>
    (100 * good) / getNumOfVotes({ good, neutral, bad });

export const Statistics = ({ good, neutral, bad }: Numbers) => {
    const hasFeedback = good || neutral || bad;
    return (
        <>
            <h1>statistics</h1>
            {hasFeedback ? (
                <table>
                    <tbody>
                        <Statistic text="good" value={good} />
                        <Statistic text="neutral" value={neutral} />
                        <Statistic text="bad" value={bad} />
                        <Statistic text="all" value={getNumOfVotes({ good, neutral, bad })} />
                        <Statistic text="average" value={calcAverage({ good, neutral, bad, getNumOfVotes })} />
                        <Statistic
                            text="positive"
                            value={`${calcPercentageOfPositive({ good, neutral, bad, getNumOfVotes })}%`}
                        />
                    </tbody>
                </table>
            ) : (
                'No feedback given'
            )}
        </>
    );
};
