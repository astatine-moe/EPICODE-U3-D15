import { Row, Col, Spinner, FormControl, Button } from "react-bootstrap";
import { FaPlayCircle } from "react-icons/fa";
import { RiHeartLine, RiHeartFill } from "react-icons/ri";
import User from "../user.png";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { opts, uri } from "../API";

const Search = (props) => {
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [firstSearch, setFirstSearch] = useState(true);
    const [error, setError] = useState("");

    const [featured, setFeatured] = useState({});
    const [songsArr, setSongsArr] = useState([]);
    const [albumsArr, setAlbumsArr] = useState([]);
    const [artistsArr, setArtistsArr] = useState([]);

    const playlists = useSelector((state) => state.playlists);
    let likedSongs = playlists.find((pl) => pl.id === "liked").songs;

    const dispatch = useDispatch();

    const searchSongs = async () => {
        setIsLoading(true);
        setError("");
        setFirstSearch(false);
        try {
            const response = await fetch(
                uri + "search?q=" + encodeURIComponent(search)
            );

            if (response.ok) {
                const { data } = await response.json();

                let artists = [];
                let songs = [];
                let albums = [];

                for (const song of data) {
                    artists.push(song.artist);
                    albums.push(song.album);
                    songs.push(song);
                }

                artists = artists
                    .filter(
                        (v, i, a) => a.findIndex((v2) => v2.id === v.id) === i
                    )
                    .slice(0, 6);
                albums = albums
                    .filter(
                        (v, i, a) => a.findIndex((v2) => v2.id === v.id) === i
                    )
                    .slice(0, 6);

                let fourSongs = songs.slice(1, 5);
                let featuredSong = songs[0];

                setSongsArr(fourSongs);
                setArtistsArr(artists);
                setAlbumsArr(albums);
                setFeatured(featuredSong);
                setIsLoading(false);
            } else {
                setError("Error fetching songs");
                setIsLoading(false);
            }
        } catch (e) {
            setError("Error fetching songs");
            setIsLoading(false);
        }
    };

    return (
        <div className="content">
            <Row>
                <Col md={10}>
                    <FormControl
                        placeholder="Search"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                        onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                searchSongs();
                            }
                        }}
                    />
                </Col>
                <Col md={2}>
                    <Button
                        className="full-width"
                        onClick={(e) => {
                            searchSongs();
                        }}
                    >
                        Search
                    </Button>
                </Col>
            </Row>
            {!firstSearch && (
                <>
                    <br />
                    <Row>
                        <Col md={4} sm={12}>
                            <h4>Top Result</h4>
                            {isLoading && <Spinner />}

                            {!isLoading && featured && (
                                <div className="showcase">
                                    <img
                                        src={`https://e-cdns-images.dzcdn.net/images/artist/${featured.md5_image}/120x120-000000-80-0-0.jpg`}
                                        alt="Song"
                                    />
                                    <h3>{featured.title}</h3>
                                    <div className="details">
                                        <a href="#">{featured.artist.name}</a>
                                        <span className="badge">SONG</span>
                                    </div>

                                    <FaPlayCircle
                                        className="fa-stack"
                                        size="40"
                                    />
                                </div>
                            )}

                            {!isLoading && !featured && (
                                <div>
                                    <h6>No songs found</h6>
                                </div>
                            )}
                        </Col>
                        <Col md={8} sm={12}>
                            <h4>Songs</h4>
                            <div className="song-list">
                                {isLoading && <Spinner />}

                                {!isLoading &&
                                    songsArr.length !== 0 &&
                                    songsArr.map((song) => (
                                        <div
                                            className="song"
                                            onClick={(e) => {
                                                dispatch({
                                                    type: "SET_PLAYING",
                                                    payload: song,
                                                });
                                            }}
                                        >
                                            <img
                                                src={`https://e-cdns-images.dzcdn.net/images/artist/${song.md5_image}/120x120-000000-80-0-0.jpg`}
                                            />
                                            <div className="details">
                                                <h4>{song.title}</h4>
                                                <a href="#">
                                                    {song.artist.name}
                                                </a>
                                                {likedSongs.find(
                                                    (s) => s.id === song.id
                                                ) && (
                                                    <RiHeartFill
                                                        size="25"
                                                        className="liked-song"
                                                        onClick={(e) => {
                                                            dispatch({
                                                                type: "REMOVE_FROM_PLAYLIST",
                                                                payload: {
                                                                    song,
                                                                    playlist_id:
                                                                        "liked",
                                                                },
                                                            });
                                                        }}
                                                    />
                                                )}
                                                {!likedSongs.find(
                                                    (s) => s.id === song.id
                                                ) && (
                                                    <RiHeartLine
                                                        size="25"
                                                        className="like-song"
                                                        onClick={(e) => {
                                                            dispatch({
                                                                type: "ADD_TO_PLAYLIST",
                                                                payload: {
                                                                    song,
                                                                    playlist_id:
                                                                        "liked",
                                                                },
                                                            });
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                {!isLoading && songsArr.length === 0 && (
                                    <div class="col-md-12">
                                        <h6>No songs found</h6>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col sm={12}>
                            <h4>Artists</h4>

                            {isLoading && <Spinner />}
                            <Row>
                                {!isLoading &&
                                    artistsArr.length !== 0 &&
                                    artistsArr.map((artist) => (
                                        <div className="col-md-2">
                                            <div className="big-card artist">
                                                <img src={artist.picture} />
                                                <h4>{artist.name}</h4>
                                                <h5>Artist</h5>
                                            </div>
                                        </div>
                                    ))}
                                {!isLoading && artistsArr.length === 0 && (
                                    <div class="col-md-12">
                                        <h6>No artists found</h6>
                                    </div>
                                )}
                            </Row>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col sm={12}>
                            <h4>Albums</h4>

                            {isLoading && <Spinner />}
                            <Row>
                                {!isLoading &&
                                    albumsArr.length !== 0 &&
                                    albumsArr.map((album) => (
                                        <div className="col-md-2">
                                            <div className="big-card artist">
                                                <img src={album.cover} />
                                                <h4>{album.title}</h4>
                                                <h5>Artist</h5>
                                            </div>
                                        </div>
                                    ))}

                                {!isLoading && albumsArr.length === 0 && (
                                    <div class="col-md-12">
                                        <h6>No albums found</h6>
                                    </div>
                                )}
                            </Row>
                        </Col>
                    </Row>
                </>
            )}
        </div>
    );
};

export default Search;
