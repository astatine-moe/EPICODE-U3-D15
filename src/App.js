import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Search from "./pages/Search";
import CreatePlaylist from "./pages/CreatePlaylist";
import Library from "./pages/Library";
import Liked from "./pages/Liked";
import Playlist from "./pages/Playlist";
import Sidebar from "./Components/Sidebar";
import Player from "./Components/Player";
import MyNav from "./Components/MyNav";

//import fonts
import "./fonts/GothamMedium.ttf";

function App() {
    return (
        <BrowserRouter>
            <div className="primary">
                <Sidebar />
                <main>
                    <MyNav />
                    <>
                        <Routes>
                            <Route path="/" element={<Search />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/library" element={<Library />} />
                            <Route
                                path="/playlist/:id"
                                element={<Playlist />}
                            />
                            <Route
                                path="/create-playlist"
                                element={<CreatePlaylist />}
                            />
                            <Route path="/liked" element={<Liked />} />
                        </Routes>
                    </>
                </main>
            </div>
            <Player />
        </BrowserRouter>
    );
}

export default App;
