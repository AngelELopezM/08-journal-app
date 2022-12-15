import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updatedNote } from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";
import { async } from "@firebase/util";

export const startNewNote = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        dispatch(savingNewNote());
        const newDoc = doc(collection(firebaseDB, `${uid}/journal/notes`));
        await setDoc(newDoc, newNote);

        newNote.id = newDoc.id;

        //dispatch
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));

    }
};

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth;

        const notes = await loadNotes(uid);

        dispatch(setNotes(notes));
    }
}

export const startSavingNotes = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active: activeNote } = getState().journal;

        const noteToFireStore = { ...activeNote };
        delete noteToFireStore.id;

        const docRef = doc(firebaseDB, `${uid}/journal/notes/${activeNote.id}`);
        await setDoc(docRef, noteToFireStore, { merge: true });

        dispatch(updatedNote(activeNote));
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving());

        const fileUploadPromises = [];
        for (const item of files) {
            fileUploadPromises.push(fileUpload(item));
        }

        const photosUrls = await Promise.all(fileUploadPromises);
        dispatch(setPhotosToActiveNote(photosUrls));
    }
}

export const startDeletingNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const { active: activeNote } = getState().journal;

        const docRef = doc(firebaseDB, `${uid}/journal/notes/${activeNote.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(activeNote.id));

    }
}