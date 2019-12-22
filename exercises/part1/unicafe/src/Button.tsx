import React from 'react';

type ButtonProps = {
    onClick: () => void;
};

export const Button = ({ onClick, children }: React.PropsWithChildren<ButtonProps>) => (
    <button onClick={onClick}> {children} </button>
);
