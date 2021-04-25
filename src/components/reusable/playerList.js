import React from 'react';
import { useList } from 'react-firebase-hooks/database';
import { db } from "../../services/firebase";

export default function PlayerList(props) {
    console.log("room ref", props.roomRef);
    const [snapshots, loading, error] = useList(db.ref('rooms/' + props.roomRef + '/players'));
    return (
        <div>
        <p>
            {error && <strong>Error: {error}</strong>}
            {loading && <span>List: Loading...</span>}
            {!loading && snapshots && (
            <React.Fragment>
                <span>
                List:{' '}
                {snapshots.map((v) => (
                    <React.Fragment key={v.key}>{v.val().name}, </React.Fragment>
                ))}
                </span>
            </React.Fragment>
            )}
        </p>
        </div>
        );
}