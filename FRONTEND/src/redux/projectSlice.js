import { createSlice } from "@reduxjs/toolkit";
const projectSlice = createSlice({
    name:"project",
    initialState:{
        allProjects:[],
        allAppliedProjects:[],
        singleProject:null,
        businessProjects:[]
    },
    reducers:{   
    setAllProjects:(state,action)=>{
        state.allProjects = action.payload;
    },
    setAllAppliedProjects:(state,action)=>{
        state.allAppliedProjects = action.payload;
    },
    setSingleProject:(state,action)=>{
        state.singleProject = action.payload;
    },
    setBusinessProjects:(state,action)=>{
        state.businessProjects = action.payload
    }
    },
});
export const {setAllProjects , setAllAppliedProjects , setSingleProject , setBusinessProjects }=projectSlice.actions;
export default projectSlice.reducer;