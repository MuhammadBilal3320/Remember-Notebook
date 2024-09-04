import React, { useEffect, useRef, useState } from 'react'
import BodyContext from './BodyContext';
import { useNavigate} from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BodyState = (props) => {

    const hostURL = 'http://localhost:8000';

    const navigate  = useNavigate();
    const [isFocused, setIsFocused] = useState(false);
    const [notesCollection, setNotesCollection] = useState([])
    const [notesChanger, setNotesChanger] = useState([]);

    const [editNote, setEditNote] = useState({ id: " ", editTitle: " ", editDescription: " ", editTag: " " });

    const updateModalNote = (currentNote) => {
        setEditNote({ id: currentNote._id, editTitle: currentNote.title, editDescription: currentNote.description, editTag: currentNote.tag });
    }

    useEffect(() => {
        const fetchAllNotes = async () => {

            const response = await fetch(`${hostURL}/api/notes/fetchAllNotes`, {
                method: "GET",
                headers: {
                    "auth-token": localStorage.getItem("token")
                }
            });
            const data = await response.json()
            setNotesCollection(data);
            setNotesChanger(data);
        }

        if(localStorage.getItem("token")){
            fetchAllNotes();
        }
        else{
            navigate("/")
        }



    }, [])

    const getCurrentDateTimeLocale = () => {
        return new Date().toLocaleString();  // Default locale and format
    };


    const addNewNote = async (title, description, tag) => {
        // DataBase Api Call Code
        const response = await fetch(`${hostURL}/api/notes/addNote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ "title": title, "description": description, "tag": tag })
        });
        const data = await response.json()

        toast.success('NOTE ADDED SUCCESSFULLY!😀', {theme: "dark",});
        
        // Client or Frontend Code
        const newNote = {
            "title": title,
            "description": description,
            "tag": tag,
            "date": getCurrentDateTimeLocale()
            
        }
        // setNotesChanger((prevNotes) => [...prevNotes, newNote]); ----> this line is same work as below line
        setNotesChanger(notesChanger.concat(newNote));//----> this is insert the new note in array 
        //------> concat  is used to insert note and create new array
        
    }

    const deleteNote = async (id) => {
        // DataBase Api Call Code
        const response = await fetch(`${hostURL}/api/notes/deleteNote/${id}`, {
            method: "DELETE",
            headers: {
                "auth-token": localStorage.getItem("token")
            },
        });
        const data = await response.json()

        toast.success('NOTE DELETED SUCCESSFULLY!😈', {theme: "dark",});

        // Client or Frontend Code
        const newNotes = notesChanger.filter(note => note._id !== id); //---->  Deleting the note use filter with the id
        setNotesChanger(newNotes);
    }

    const updateNote = async (id, title, description, tag) => {
        // DataBase Api Call Code
        const response = await fetch(`${hostURL}/api/notes/updateNote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ "title": title, "description": description, "tag": tag })
        });
        const data = await response.json()
        toast.success('NOTE UPDATED SUCCESSFULLY!😁', {theme: "dark",});

        // Client or Frontend Code
        let newNote = JSON.parse(JSON.stringify(notesChanger));
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if (element._id === id) {
                newNote[index].title = title;
                newNote[index].description = description;
                newNote[index].tag = tag;
                break;
            }
        }
        setNotesChanger(newNote);
    }

    return (
        <BodyContext.Provider value={{ isFocused, setIsFocused, notesCollection, setNotesChanger, notesChanger, addNewNote, deleteNote, updateModalNote, editNote, setEditNote, updateNote }}>
            {props.children}
        </BodyContext.Provider>
    )
}

export default BodyState
