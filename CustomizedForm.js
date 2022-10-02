

import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, MenuItem, Typography, Box, Select } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import InputLabel from '@material-ui/core/InputLabel';
import DialogTitle from '@material-ui/core/DialogTitle';



const useStyles = makeStyles((theme) => ({

}));

const usePlaceholderStyles = makeStyles(theme => ({
    placeholder: {
        color: "#aaa"
    }
}));

const Placeholder = ({ children }) => {
    const classes = usePlaceholderStyles();
    return <div className={classes.placeholder}>{children}</div>;
};
const CustomField = ({ name, type, value, prop, options, handleFormChange, derived, parentData, labelProp, multiple }) => {
    if (derived) {

        return (
            <>
                <InputLabel id="label">{name}</InputLabel>

                <Select
                    labelId="label"
                    multiple={multiple}
                    label={name}
                    value={value}
                    onChange={e => handleFormChange(e)}
                    name={prop}
                    fullWidth
                >
                    {parentData.map((option, i) => (
                        <MenuItem key={i} value={option.id}>
                            {option[labelProp]}
                        </MenuItem>
                    ))}
                </Select>
            </>

        )
    }
    switch (type) {

        case 'link': return (
            <Box my={2}>
                <Button
                    variant="contained"
                    component="label"


                >
                    Upload File
                <input
                        label={name}
                        name={prop}
                        type="file"
                        hidden
                        onChange={e => handleFormChange(e)}
                    />
                </Button>
            </Box>
        )

        case 'select': return (
            <TextField
                select
                name={prop}
                label={name}
                value={value}
                onChange={e => handleFormChange(e)}

                name={prop}
                fullWidth
            >
                {options.map((option, i) => (
                    <MenuItem key={i} value={option.value}>
                        {option.name}
                    </MenuItem>
                ))}
            </TextField>
        )
        default: return (
            <TextField
                label={name}
                value={value}
                onChange={e => handleFormChange(e)}
                name={prop}

                fullWidth
            />)

    }

}

function CustomizedForm({ formData, formOpen, heading, handleFormSubmit, header, handleFormChange, handleFormOpen, handleFormClose, parentData, message }) {
    const classes = useStyles()
    return (
        <>
            <Button variant="contained" color="primary" onClick={handleFormOpen}>
                {message ? message : 'add new'}
            </Button>
            <Dialog
                spacing={2}
                className={classes.root}
                open={formOpen}
                onClose={handleFormClose}
                aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{heading}</DialogTitle>

                <DialogContent>


                    {header.map((field, index) => field.form && (

                        <CustomField
                            key={index}
                            name={field.name}
                            type={field.type}
                            value={formData[field.prop]}
                            handleFormChange={handleFormChange}
                            prop={field.prop}
                            options={field.options}
                            derived={field.derived}
                            parentData={field.parentData}
                            labelProp={field.labelProp}
                            multiple={field?.multiple}
                        />
                    ))}

                    <DialogActions>
                        <Button onClick={handleFormClose} color="primary">
                            Cancel
                    </Button>
                        <Button type="submit" variant="contained" onClick={(e) => handleFormSubmit(e)} color="primary">
                            Submit
                    </Button>

                    </DialogActions>
                </DialogContent>

            </Dialog>

        </>
    )
}

export default CustomizedForm
