import React from "react";

import clsx from "clsx";

import styles from "./Button.module.css";

type TButton = (options: { title: string, disabled: boolean, onClick: () => void, isActive?: boolean }) => any;

export const Button: TButton = (options) => {

    const handleClick = (_event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (options?.onClick) options?.onClick()
    }

    return <button type='button' disabled={options?.disabled}
                   className={clsx(styles.button, options?.isActive ? styles.button_active : null)}
                   onClick={(event) => handleClick(event)}>{options?.title}</button>
}
