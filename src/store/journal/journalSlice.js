import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updatedNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map(x => {

                if (x.id === action.payload.id) {
                    return action.payload;
                }
                return x;
            })

            state.messageSaved = `${action.payload.title}, actualizada correctamente`
        },
        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
            state.isSaving = false;
        },
        clearNotesLogOut: (state) => {
            state.isSaving = false;
            state.messageSaved = "";
            state.notes = [];
            state.active = null;
        },
        deleteNoteById: (state, action) => {
            state.active = null;
            state.notes = state.notes.filter(x=> x.id !== action.payload);
        },

    }
});


// Action creators are generated for each case reducer function
export const { addNewEmptyNote, setActiveNote, setNotes, setSaving, updatedNote, deleteNoteById, savingNewNote, setPhotosToActiveNote, clearNotesLogOut } = journalSlice.actions;