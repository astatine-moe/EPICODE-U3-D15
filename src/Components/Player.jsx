import { useSelector } from "react-redux";
import { BsMusicNoteList, BsSpeaker, BsVolumeUp } from "react-icons/bs";
import { FaPlayCircle } from "react-icons/fa";
import { BiShuffle, BiSkipPrevious, BiSkipNext } from "react-icons/bi";
import { SlLoop } from "react-icons/sl";

const Player = () => {
    const song = useSelector((state) => state.playing);
    let valid = !(Object.keys(song).length === 0);
    console.log(song, valid);
    return (
        <div className="player">
            <div className="song">
                <img
                    src={
                        valid
                            ? `https://e-cdns-images.dzcdn.net/images/artist/${song.md5_image}/120x120-000000-80-0-0.jpg`
                            : ""
                    }
                    alt={valid ? song.title : "N/A"}
                />
                <div className="text">
                    <h3>{valid ? song.title : "N/A"}</h3>
                    <h4>{valid ? song.artist.name : "None selected"}</h4>
                </div>
                <div className="like"></div>
            </div>
            <div className="controls">
                <div className="buttons">
                    <BiShuffle className="button" size="22" />
                    <BiSkipPrevious className="button" size="35" />
                    <FaPlayCircle className="button" size="30" />
                    <BiSkipNext className="button" size="35" />
                    <SlLoop className="button" size="20" />
                </div>
                <div className="playback-bar">
                    <div className="playback-position">0:10</div>
                    <div className="playback-progressbar">
                        <div
                            className="progress--bar"
                            style={{ "--progress-bar-width": "10%" }}
                        >
                            <div className="progress--bar-bg">
                                <div className="bg">
                                    <div className="bar"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="playback-duration">3:10</div>
                </div>
            </div>
            <div className="actions">
                <BsMusicNoteList size="20" />
                <BsSpeaker size="20" />
                <BsVolumeUp size="20" />

                <div className="volume-bar">
                    <div className="progress--bar">
                        <div className="progress--bar-bg">
                            <div className="bg"></div>
                            <div className="fg"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Player;
