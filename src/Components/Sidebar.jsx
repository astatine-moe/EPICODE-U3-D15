import { FaSpotify, FaHome, FaDiscord } from "react-icons/fa";
import { BiLibrary, BiSearch, BiPlus, BiHeart } from "react-icons/bi";
import NavItem from "./NavItem";
import { useSelector } from "react-redux";

let iconSize = "20";

const Sidebar = () => {
    const playlists = useSelector((state) => state.playlists);
    return (
        <aside className="sidebar">
            <div className="d-flex flex-column flex-shrink-0 p-3">
                <a
                    href="#"
                    className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none brand"
                >
                    <FaSpotify className="upside-down" />
                    &nbsp; Spotify
                </a>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    <NavItem
                        text="Home"
                        href="/"
                        icon={<FaHome size={iconSize} />}
                    />
                    <NavItem
                        text="Search"
                        href="/search"
                        icon={<BiSearch size={iconSize} />}
                    />
                    <NavItem
                        text="Your Library"
                        href="/library"
                        icon={<BiLibrary size={iconSize} />}
                    />
                    <br />
                    <NavItem
                        text="Create Playlist"
                        href="/create-playlist"
                        icon={<BiPlus />}
                    />
                    <NavItem
                        text="Liked Songs"
                        href="/playlist/liked"
                        icon={<BiHeart />}
                    />
                </ul>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto">
                    {/* Playlists */}
                    {playlists.length === 0 && (
                        <>
                            <h6>No playlists found</h6>
                        </>
                    )}
                    {playlists.length > 0 &&
                        playlists.map((playlist) => {
                            if (!playlist.hidden) {
                                return (
                                    <NavItem
                                        text={playlist.name}
                                        href={`/playlist/${playlist.id}`}
                                    ></NavItem>
                                );
                            }
                        })}
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;
