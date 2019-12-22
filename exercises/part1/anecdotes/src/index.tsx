import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const setSelectedAnecdoteIndex = ({
    anecdotes,
    setSelected
}: {
    anecdotes: string[];
    setSelected: (index: number) => void;
}) => () => setSelected(Math.floor(Math.random() * anecdotes.length));

const storeVotes = ({
    votes,
    selected,
    setVotes
}: {
    votes: number[];
    selected: number;
    setVotes: (votes: number[]) => void;
}) => () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
};

const MostVotes = ({ votes, anecdotes }: { votes: number[]; anecdotes: string[] }) => {
    const mostVotes = Math.max(...votes);
    const indexOfMostVoted = votes.indexOf(mostVotes);
    return (
        <>
            <div>{anecdotes[indexOfMostVoted]}</div>
            <div>has {votes[indexOfMostVoted]} votes</div>
        </>
    );
};

const App = ({ anecdotes }: { anecdotes: string[] }) => {
    const [selected, setSelected] = useState<number>(0);
    const [votes, setVotes] = useState<number[]>(Array(anecdotes.length).fill(0));

    return (
        <>
            <h1>Anecdote of the day</h1>
            <div>{anecdotes[selected]}</div>
            <div>has {votes[selected]} votes</div>
            <button onClick={storeVotes({ votes, selected, setVotes })}>vote</button>
            <button onClick={setSelectedAnecdoteIndex({ anecdotes, setSelected })}>next anecdote</button>
            <h1>Anecdote with the most votes</h1>
            <MostVotes votes={votes} anecdotes={anecdotes} />
        </>
    );
};

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
