import { combineReducers } from "@reduxjs/toolkit";
import playing from "./playing";
import playlists from "./playlists";

export default combineReducers({
    playing,
    playlists,
});
