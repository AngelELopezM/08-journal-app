import React from 'react'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

import { useForm } from '../../hooks/useForm'
import { setActiveNote } from '../../store/journal/journalSlice'
import { startDeletingNote, startSavingNotes, startUploadingFiles } from '../../store/journal/thunks'
import { ImageGallery } from '../components'

export const NoteView = () => {

    const dispatch = useDispatch();

    const { active: activeNote, messageSaved, isSaving } = useSelector(x => x.journal);

    const { body, title, date, onInputChange, formState } = useForm(activeNote);

    const dateString = useMemo(() => {
        const newDate = new Date(date);

        return newDate.toUTCString();
    }, [date])

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState])

    useEffect(() => {
        if (messageSaved.length > 0)
            Swal.fire('Nota actualizada', messageSaved, 'success');

    }, [messageSaved])


    const onSaveNote = () => {
        dispatch(startSavingNotes());
    }

    const fileInputRef = useRef();

    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return;
        console.log("Dizque subiendo archivos");
        dispatch(startUploadingFiles(target.files));
    }

    const onDelete = () => {
        Swal.fire({
            title: 'Delete note',
            text: 'You sure you want to delete this note?',
            icon: 'warning',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            showConfirmButton: true,
            showCancelButton: true
        }).then(x => {
            if (x.isConfirmed) {
                dispatch(startDeletingNote());
                Swal.fire('', 'Note deleted successfuly', 'success')
            }
        })

    }

    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
            <Grid item>
                <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
            </Grid>

            <Grid item>

                <input
                    type="file"
                    accept='.png,.jpg,.webp,.jpeg'
                    multiple
                    ref={fileInputRef}
                    onChange={onFileInputChange}
                    style={{ display: 'none' }}
                />
                <IconButton
                    color='primary'
                    disabled={isSaving}
                    onClick={() => fileInputRef.current.click()}
                >
                    <UploadOutlined />
                </IconButton>



                <Button
                    onClick={onSaveNote}
                    color='primary'
                    sx={{ p: 2 }}
                >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    placeholder='input a title'
                    label='title'
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={title}
                    onChange={onInputChange}
                />

                <TextField
                    type='text'
                    variant='filled'
                    fullWidth
                    multiline
                    placeholder='What happened during the day?'
                    label="What happened during the day?"
                    minRows={5}
                    name="body"
                    value={body}
                    onChange={onInputChange}
                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick={onDelete}
                    sx={{ mt: 2 }}
                    color='error'
                >
                    <DeleteOutline />
                    Borrar
                </Button>

            </Grid>

            <ImageGallery images={activeNote.imageUrls} />

        </Grid>
    )
}