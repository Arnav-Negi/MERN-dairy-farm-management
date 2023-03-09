import {Dialog, List, ListItem, ListItemButton, ListItemText, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import axios from "axios";
import {useRecoilState} from "recoil";
import {userAtom} from "../../atoms/user"
import updateField from "../../utils/updateField";


export default function EditCustomer() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useRecoilState(userAtom);
    const [formData, setFormData] = useState({});
    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSubmit = () => {
        let censored = false;
        let wordlist = formData.toLowerCase().split(" ,.;");
        sg.bannedWords.forEach(function(word){
            if (wordlist.indexOf(word.toLowerCase()) !== -1)
                censored = true;
        })
        if (censored) alert("Your post contains words that are banned in this subgreddiit.")
        axios.post('/posts', {
            text: formData,
            subgreddiit: sg._id
        }).then((res) => {
            console.log(res.data);
            alert("Post submitted.");
            setSg({...sg,  posts: [...sg.posts, {
                text: formData,
                    poster: user,
                    subgreddiits: sg._id,
                    upvoteUsers: [],
                    comments: []
                }]})
            setOpen(false);
        }).catch(err => {
            console.log(err);
            alert("Error in submitting post");
            setOpen(false);
        });
    }

    return (
        <div className={'flex justify-center'}>
            <Button variant="contained"
                    onClick={handleClickOpen}
                    sx={{
                        minHeight: '30%'
                    }}>
                <Typography color={'text.secondary'} fontSize={20}>Edit settings</Typography>
            </Button>
            <Dialog onClose={handleClose} open={open} fullWidth={true} >
                <Typography variant={'h6'} sx={{marginLeft: '5%',marginRight: '5%',marginTop: '5%'}}>Edit user content</Typography>
                {Object.keys(user).map(key => {
                    <TextField 
                    value={formData[key]} 
                    onChange={(e) => setFormData({...updateField(formData, key, e.target.value)})}
                    sx={{margin: '5%'}}
                    ></TextField>
                })}
                <Button variant={'contained'}   
                        onClick={handleSubmit}
                        sx={{
                            minHeight: '30%'
                        }}>
                    <Typography color={'text.secondary'} fontSize={20}>SAVE</Typography>
                </Button>
            </Dialog>
        </div>
    );
};