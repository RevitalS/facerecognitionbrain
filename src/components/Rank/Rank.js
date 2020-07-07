import React from 'react';


const Rank = ({name, entries}) => {
    return (
        <div>
            <div className='white f3'>
                {
                    name === 'geust'
                    ? 'Hi Geust, the current search count for all our geusts is'
                    :`${name} , your current entry count is...`
                }
                
            </div>
            <div className='white f1'>
                {entries}
            </div>
            <div className='white f4'>
                {
                    name === 'geust'
                    ? 'Add your search'
                    : ""
                }
            </div>
            
        </div>
    )
}

export default Rank;