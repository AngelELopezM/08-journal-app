import { collection, getDocs } from "firebase/firestore/lite"
import { firebaseDB } from "../firebase/config"

export const loadNotes = async (uid = '') => {

    const collectionRef = collection(firebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);

    const notes = [];
    docs.forEach(x=>{
        notes.push({id: x.id, ...x.data()});
    })
    
    return notes;
}