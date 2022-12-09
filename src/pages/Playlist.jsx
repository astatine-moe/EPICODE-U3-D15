import { useParams } from "react-router-dom";
import SongImg from "../song-img.png";
import User from "../user.png";
import Table from "react-bootstrap/Table";
import { HiOutlineClock } from "react-icons/hi";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import { useSelector, useDispatch } from "react-redux";

function fancyTimeFormat(duration) {
    // Hours, minutes and seconds
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

const Playlist = (props) => {
    const { id } = useParams();
    const playlists = useSelector((state) => state.playlists);
    let playlist = playlists.find((pl) => pl.id === id);

    const dispatch = useDispatch();

    return (
        <div>
            <div className="playlist-holder">
                <img src={playlist.image} />
                <div className="playlist-details">
                    <span>Public Playlist</span>
                    <h3>{playlist.name}</h3>
                    <div className="about-playlist">
                        <img src={User} />
                        John Doe
                    </div>
                </div>
            </div>
            <div className="playlist-content">
                <Table variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Album</th>
                            <th>Date added</th>
                            <th>
                                <HiOutlineClock />
                            </th>
                        </tr>
                    </thead>
                    <br />
                    <tbody>
                        {playlist.songs.length === 0 && (
                            <tr>
                                <td colSpan={5}>No songs found</td>
                            </tr>
                        )}

                        {playlist.songs.length > 0 &&
                            playlist.songs.map((song, i) => (
                                <tr
                                    onClick={(e) => {
                                        dispatch({
                                            type: "SET_PLAYING",
                                            payload: song,
                                        });
                                    }}
                                >
                                    <td>{i + 1}</td>
                                    <td>
                                        <img
                                            src={`https://e-cdns-images.dzcdn.net/images/artist/${song.md5_image}/120x120-000000-80-0-0.jpg`}
                                        />
                                        {song.title}
                                    </td>
                                    <td>{song.album.title}</td>
                                    <td>27 days ago</td>
                                    <td>{fancyTimeFormat(song.duration)}</td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Playlist;
