import React from 'react';

export const Statistic = ({ text, value }: { text: string; value: number | string }) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
);
