import { Row, Col, Spinner, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import hat from "hat";

const CreatePlaylist = (props) => {
    const [playlist, setPlaylist] = useState("");
    let navigate = useNavigate();
    const playlists = useSelector((state) => state.playlists);
    const dispatch = useDispatch();
    return (
        <div className="content">
            <Row>
                <Col md={6}>
                    <Form.Label>Playlist name</Form.Label>
                    <Form.Control
                        type="text"
                        value={playlist}
                        maxlength="32"
                        onChange={(e) => {
                            setPlaylist(e.target.value);
                        }}
                    />
                    <br />
                    {playlist && (
                        <Button
                            onClick={(e) => {
                                //
                                let id = hat();
                                dispatch({
                                    type: "CREATE_PLAYLIST",
                                    payload: {
                                        name: playlist,
                                        id,
                                        songs: [],
                                    },
                                });
                                navigate(`/playlist/${id}`);
                            }}
                        >
                            Create
                        </Button>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default CreatePlaylist;
