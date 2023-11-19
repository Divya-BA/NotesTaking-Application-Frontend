import { createSlice } from "@reduxjs/toolkit";

export const stateSlice = createSlice({
    name:'toggle',
    initialState:{
        editNote: false,
        addNote:false,
        sidebar: false,
        grid:true,
        login:true,
        userid:'',
        userinfo:[],
    },
    reducers:{
        editNoteToggle:(state)=>{
            state.editNote = !state.editNote
        },
        addNoteToggle:(state)=>{
            state.addNote = !state.addNote
        },
        sidebar:(state)=>{
            state.sidebar = !state.sidebar;
        },
        gridToggle:(state)=>{
            state.grid = !state.grid
        },
        loginToggle:(state,action)=>{
            state.login = action.payload
        },
        userIdState: (state, action)=>{
            state.userid = action.payload
        },
        userInfo: (state,action) => {
            state.userinfo = action.payload;
        }

    }
});
 
export const {editNoteToggle, addNoteToggle, sidebar , gridToggle , loginToggle, userIdState, userInfo} = stateSlice.actions;
