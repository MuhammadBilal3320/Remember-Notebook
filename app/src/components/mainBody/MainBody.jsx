import React from 'react'
import Navbar from './Navbar'
import Body from './Body'
import BodyState from '../../useContext/BodyState'

const MainBody = () => {
    return (
        <>
            <BodyState>
                <Navbar />
                <Body />
            </BodyState>
        </>
    )
}

export default MainBody
