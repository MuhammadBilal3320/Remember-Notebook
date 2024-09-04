import React from 'react';
import { Button, Box, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const LogoutButton = (props) => {

    const navigate = useNavigate();
    const [hover, setHover] = useState(false);

    const handleLogout = ()=>{
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <Button onClick={handleLogout}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            width={hover ? '125px' : '45px'}
            height="45px"
            border="none"
            borderRadius={hover ? '40px' : '50%'}
            cursor="pointer"
            position="relative"
            overflow="hidden"
            transition="all 0.3s ease-in-out"
            boxShadow="2px 2px 10px rgba(0, 0, 0, 0.199)"
            bg={props.logoColor}
            _active={{ transform: 'translate(2px, 2px)' }}
        >
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width={hover ? '30%' : '100%'}
                transition="width 0.3s ease-in-out"
                pl={hover ? '20px' : '0'}
            >
                {props.icon}
            </Box>
            <Text
                position="absolute"
                right="0"
                width={hover ? '70%' : '0'}
                opacity={hover ? 1 : 0}
                color="white"
                fontSize="1.2em"
                fontWeight="600"
                transition="all 0.3s ease-in-out"
                pr={hover ? '10px' : '0'}
            >
                {props.title}
            </Text>
        </Button>
    );
};

export default LogoutButton;
