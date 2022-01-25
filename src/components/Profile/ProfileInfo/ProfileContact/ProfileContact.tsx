import React from "react";

export const ProfileContact: React.FC<{ title: string, value: string | null }> = ({title, value}) => {
    return (
        <div style={{marginLeft: 15}}>{title}: {value}</div>
    )
}