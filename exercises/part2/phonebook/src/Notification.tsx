import React from 'react'
import "./Notification.css"

export const Notification = ({ message, type }: { message: string | null, type: "success" | "error" }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={type}>
            {message}
        </div>
    )
}