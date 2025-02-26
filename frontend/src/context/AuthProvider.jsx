import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    let [id, setId] = useState(0);
    let [name, setName] = useState("");
    let [password, setPassword] = useState("");
    let [courriel, setCourriel] = useState("");
    let [repertoirePlanteId, setPlant] = useState([]);

    
}