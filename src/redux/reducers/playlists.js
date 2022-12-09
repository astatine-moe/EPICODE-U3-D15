import BigCard from "../../big-card.png";
import SongImg from "../../song-img.png";

export default function playlists(
    state = [
        {
            name: "Liked Songs",
            hidden: true,
            id: "liked",
            songs: [],
            image: BigCard,
        },
    ],
    action
) {
    switch (action.type) {
        case "CREATE_PLAYLIST":
            return [...state, { ...action.payload, image: SongImg }];
        case "ADD_TO_PLAYLIST":
            let playlist = state.find(
                (playlist) => playlist.id === action.payload.playlist_id
            );
            if (!playlist) return state;
            playlist.songs = [...playlist.songs, action.payload.song];

            return [...state];
        case "REMOVE_FROM_PLAYLIST":
            let rPlaylist = state.find(
                (playlist) => playlist.id === action.payload.playlist_id
            );
            if (!rPlaylist) return state;

            rPlaylist.songs = [
                ...rPlaylist.songs.filter(
                    (song) => song.id !== action.payload.song.id
                ),
            ];

            return [...state];

        default:
            return state;
    }
}
