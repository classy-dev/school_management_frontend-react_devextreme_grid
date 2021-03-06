import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import UniversityTable from './UniversityTable'

const useStyles = makeStyles({
    header: {
        background: '#039be5'
    }
});

function UniversityList() {
    const classes = useStyles();

    return (
        <FusePageSimple
            classes={{
                header: classes.header,
                toolbar: 'px-24 border-b-1'
            }}
            header={
                <div className="pl-24">
                    <h1 className="text-48">UniversityList</h1>
                </div>
            }
            content={

                <FuseAnimateGroup enter={{ animation: "transition.slideLeftBigIn" }} leave={{ animation: "transition.slideRightBigOut" }}>

                    <div className="flex flex-wrap">
                        <div className="w-full p-24">
                            <UniversityTable />
                        </div>
                    </div>
                </FuseAnimateGroup>
            }
            innerScroll
        />
    );
}
export default UniversityList;