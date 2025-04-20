import { getDocs, collection, where, query, orderBy, updateDoc, addDoc, doc, deleteDoc, getDoc, Timestamp, setDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

export default function useFetchData() {
    // const baseApiUrl

    async function getData(collectionName){
        const dataCollection = collection(db, collectionName);
        const snapshot = await getDocs(dataCollection);
      
        const docsList = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        return docsList;
    }

    async function getDataById(collectionName, id){
        try {
            const docRef = doc(db, collectionName, id);
            const docSnap = await getDoc(docRef);
        
            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                console.log("Nenhum documento encontrado!");
                return null;
            }
        } catch (error) {
            console.error("Erro ao buscar documento:", error);
        }
    }

    async function getDataByQuery(collectionName, conditions) {
        const dataCollection = collection(db, collectionName);
    
        const q = query(dataCollection, ...conditions.map(cond => where(cond.field, cond.operator, cond.value)));
    
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async function getOrderedData(collectionName, orderField, orderDirection) {
        try {
            const dataCollection = collection(db, collectionName);    
            const q = query(dataCollection, orderBy(orderField, orderDirection));
    
            const snapshot = await getDocs(q);
            const docsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return docsList;
        } catch (error) {
            console.error("Erro ao obter os dados ordenados:", error);
            throw error;
        }
    }

    async function getQueryAndOrderedData(collectionName, field, operator, value, orderField, orderDirection = "asc") {
        try {
            const dataCollection = collection(db, collectionName);
            const q = query(
                dataCollection,
                where(field, operator, value),
                orderBy(orderField, orderDirection)
            );
    
            const snapshot = await getDocs(q);
            const docsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return docsList;
        } catch (error) {
            console.error("Erro ao obter os dados filtrados e ordenados:", error);
            throw error;
        }
    }

    async function setData(collectionName, data, customId = null) {
        try {
            const dataCollection = collection(db, collectionName);
            if (customId) {
                const docRef = doc(dataCollection, customId);
                await setDoc(docRef, data);
                console.log("Documento adicionado com ID personalizado:", customId);
                return customId;
            } else {
                const docRef = await addDoc(dataCollection, data);
                console.log("Documento adicionado com ID automático:", docRef.id);
                return docRef.id;
            }
        } catch (error) {
            console.error("Erro ao adicionar documento:", error);
            throw error; 
        }
    }

    async function updateData(collectionName, docId, newData) {
        try {
            const docRef = doc(db, collectionName, docId); 
            await updateDoc(docRef, newData); 
            console.log("Documento atualizado com sucesso");
        } catch (error) {
            console.error("Erro ao atualizar documento:", error);
            throw error;
        }
    }

    async function deleteData(collectionName, docId) {
        try {
            const docRef = doc(db, collectionName, docId); 
            await deleteDoc(docRef); 
            console.log("Documento deletado com sucesso");
        } catch (error) {
            console.error("Erro ao deletar documento:", error);
            throw error;
        }
    }

    // Not Crud (But utils)

    function setDateToTimestamp(date) {
        return Timestamp.fromDate(date);
    }

    return { getData, getDataById, getDataByQuery, getOrderedData, getQueryAndOrderedData, setData, updateData, deleteData, setDateToTimestamp }
}