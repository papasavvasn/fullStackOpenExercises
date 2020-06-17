import React from 'react';

type PartAndExercises = {
    name: string;
    exercises: number;
};

type CourseProps = {
    id: number;
    name: string
    parts: (PartAndExercises & { id: number })[]
}

const Header = ({ course }: { course: string }) => <h2>{course}</h2>;

const Part = ({ name, exercises }: PartAndExercises) => (
    <p>
        {name} {exercises}
    </p>
);

const Content = ({ parts }: { parts: PartAndExercises[] }) => <>{parts.map(({ name, exercises }) => <Part key={name} name={name} exercises={exercises} />)}</>

const totalExercises = (parts: PartAndExercises[]) => parts.reduce((acc, el) => acc + el.exercises, 0)

export const Total = ({ parts }: { parts: PartAndExercises[] }) => (
    <p style={{ fontWeight: 600 }}>total of {totalExercises(parts)} exercises</p>
);


export const Course = ({ course: { name, parts } }: { course: CourseProps }) => (<div>
    <Header course={name} />
    <Content parts={parts} />
    <Total parts={parts} />
</div>)