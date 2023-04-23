import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import {useState} from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import updateField from "../../utils/updateField.jsx";

export default function AddProduct(props) {
    const {open, setOpen} = props;
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        discount: '',
        weeklyQuantity: '',
    });

    const keyToLabel = {
        name: 'Name',
        description: 'Description',
        price: 'Price',
        discount: 'Discount',
        weeklyQuantity: 'Weekly Quantity',
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setOpen(false);
    }

    const getInput = (key) => {
        if (key === 'description')
        {
            return (<Input
                sx={{
                    fontSize: 'large',
                    padding: 1,
                    border: 1,
                    borderColor: 'primary.main'
                }}
                value={formData[name]}
                variant={"outlined"}
                color={"text.primary"}
                onChange={(e) =>
                    setFormData({...updateField(formData, key, e.target.value)})}/>
            )
        }
        else if (key === 'price' || key === 'discount' || key === 'weeklyQuantity')
        {
            return (<Input
                sx={{
                    fontSize: 'large',
                    padding: 1,
                    border: 1,
                    borderColor: 'primary.main'
                }}
                value={formData[name]}
                variant={"outlined"}
                type={"number"}
                color={"text.primary"}
                onChange={(e) =>
                    setFormData({...updateField(formData, key, e.target.value)})}/>
            )
        }
    }


    return (
        <React.Fragment>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={() => setOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        maxWidth: 500,
                        minWidth: 600,
                        borderRadius: 'md',
                        p: 5,
                        paddingLeft: 10,
                        paddingRight: 10,
                        boxShadow: 'lg',
                    }}
                >
                    <ModalClose
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />

                    <form onSubmit={handleSubmit}>
                        {Object.keys(formData).map((key) => (
                            <FormControl>
                                <FormLabel>
                                    {keyToLabel[key]}
                                </FormLabel>
                                <Input
                                    sx={{
                                        fontSize: 'large',
                                        padding: 1,
                                        border: 1,
                                        borderColor: 'primary.main'
                                    }}
                                    value={formData[name]}
                                    variant={"outlined"}
                                    color={"text.primary"}
                                    onChange={(e) =>
                                        setFormData({...updateField(formData, key, e.target.value)})}/>
                            </FormControl>
                        ))}
                    </form>
                </Sheet>
            </Modal>
        </React.Fragment>
    );
}