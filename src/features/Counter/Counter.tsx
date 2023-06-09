import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { decrement, increment, incrementAsync, incrementByAmount, incrementIfOdd, selectCount } from './counterSlice';
import styles from './Counter.module.css';
import { Navigate } from 'react-router-dom';
import { ListPacks } from '../Packs/ListPacks/ListPacks';
import { selectorIsAppInit } from '../../app/app.selector';

export function Counter() {
    const count = useAppSelector(selectCount);
    const isAppInitialized: boolean = useAppSelector(selectorIsAppInit);

    const dispatch = useAppDispatch();
    const [incrementAmount, setIncrementAmount] = useState('2');

    const incrementValue = Number(incrementAmount) || 0;

    if (!isAppInitialized) return <Navigate to={'/login'} />;
    return (
        <div>
            <ListPacks />
            <div className={styles.row}>
                <button className={styles.button} aria-label="Decrement value" onClick={() => dispatch(decrement())}>
                    -
                </button>
                <span className={styles.value}>{count}</span>
                <button className={styles.button} aria-label="Increment value" onClick={() => dispatch(increment())}>
                    +
                </button>
            </div>
            <div className={styles.row}>
                <input
                    className={styles.textbox}
                    aria-label="Set increment amount"
                    value={incrementAmount}
                    onChange={(e) => setIncrementAmount(e.target.value)}
                />
                <button className={styles.button} onClick={() => dispatch(incrementByAmount(incrementValue))}>
                    Add Amount
                </button>
                <button className={styles.asyncButton} onClick={() => dispatch(incrementAsync(incrementValue))}>
                    Add Async
                </button>
                <button className={styles.button} onClick={() => dispatch(incrementIfOdd(incrementValue))}>
                    Add If Odd
                </button>
            </div>
        </div>
    );
}
