import React from 'react';

export const Loading = () => {
    return(
        <div className='container text-center'>
            <div className=" d-dlex col-4 row justify-content-center align-items-center">
               <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary align-self-center"></span>
               <p>Loading . . .</p>
            </div>
        </div>
        
    );
};