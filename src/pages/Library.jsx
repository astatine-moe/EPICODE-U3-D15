import { Row, Col, Spinner, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import SongImg from "../song-img.png";
import { Link } from "react-router-dom";

const Library = (props) => {
    const playlists = useSelector((state) => state.playlists);
    return (
        <div className="content">
            <h3>Playlists</h3>

            <Row>
                {playlists.length === 0 && (
                    <>
                        <h6>No playlists found</h6>
                    </>
                )}

                {playlists.length > 0 &&
                    playlists.map((playlist) => (
                        <Col md={2}>
                            <Link
                                to={`/playlist/${playlist.id}`}
                                className="big-card playlist"
                            >
                                <img src={playlist.image} />
                                <h4>{playlist.name}</h4>
                                <h5>by John Doe</h5>
                            </Link>
                        </Col>
                    ))}
            </Row>
        </div>
    );
};

export default Library;
