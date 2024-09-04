import React, { useContext } from 'react';
import { Box, Card, Icon, Tag, Text } from '@chakra-ui/react';
import { MdDelete } from "react-icons/md";
import BodyContext from '../../useContext/BodyContext';

const CardContainer = ({ setEditModal }) => {
    const { notesChanger, deleteNote, updateModalNote } = useContext(BodyContext);

    const handleChild = (e, noteId) => {
        deleteNote(noteId);
        e.stopPropagation();
    }

    // Function to format the date
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    return (
        <>
        {/* <Container width={"100%"} color={"gray"} display={"flex"} justifyContent={"center"} alignItems={"center"} ><Text fontSize={"30px"} fontWeight={"800"}>{notesChanger.length === 0 && "NO NOTES FOUND 😴"}</Text></Container> */}
            {notesChanger.map((note, index) => (
                <Card
                    onClick={() => {setEditModal(true); updateModalNote(note)} }
                    key={index


        
                    }
                    cursor={"pointer"}
                    margin={"15px"}
                    padding={"5px"}
                    position={"relative"}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    borderRadius={"15px"}
                    shadow={"0px 1px 5px 0px black"}
                    border={"none"}
                    height={"140px"}
                    transition={"all 0.1s ease-in"}
                    _hover={{ transform: "scale(1.050)", transition: "all 0.2s ease-in" }}
                >
                    <Box width={"300px"} padding={"5px 10px"}>
                        <Text fontWeight={"600"}>{note.title}</Text>
                        <Text lineHeight={"18px"} height={"37px"} overflow={"hidden"}>{note.description}</Text>
                    </Box>
                    <Box height={"30px"} width={"90%"} padding={"5px"}>
                        <Tag fontSize={"10px"} borderRadius={"100px"} padding={"2px 5px"} bg={"gray"} color={"white"}>{note.tag}</Tag>
                    </Box>
                    <Box display={"flex"} justifyContent={"end"} alignItems={"center"}>
                        <Text padding={"2px 15px"} fontSize={"12px"} color={"gray"}>Created {formatDate(note.date)}</Text>
                    </Box>
                    <Box 
                        onClick={(e) => handleChild(e, note._id)}
                        position={"absolute"}
                        left={"0"}
                        bottom={"0"}
                        display={"flex"}
                        width={"100%"}
                        justifyContent={"center"}
                        borderRadius={"0 0 15px 15px"}
                        alignItems={"center"}
                        cursor={"pointer"}
                        bg={"#ef2613ad"}
                        opacity={"0"}
                        _hover={{ opacity: "1" }}
                    >
                        <Icon
                            onClick={(e) => handleChild(e, note._id)}
                            as={MdDelete}
                            fontSize={"30px"}
                        />
                    </Box>
                </Card>
            ))}
        </>
    );
};

export default CardContainer;
