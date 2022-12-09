export default function playing(state = {}, action) {
    switch (action.type) {
        case "SET_PLAYING":
            return action.payload;
        default:
            return state;
    }
}
