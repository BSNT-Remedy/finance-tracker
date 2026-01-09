import { createContext, useContext, useState, useEffect } from "react";
import { ACCESS_TOKEN } from "../constants";
import api from "../api";

const ExpenseContext = createContext()

export const useExpense = () => useContext(ExpenseContext);
export const ExpenseProvider = ({children}) => {
    const [expenses, setExpenses] = useState([]);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState(0);
    const [spent_at, setSpent_at] = useState("");

    

    const getExpenses = async () => {
        try {
            const res = await api.get("/api/expenses/");
            console.log("res.data to: ", res.data);
            setExpenses(res.data);
        } catch (error) {
            console.log(error);
            setExpenses([]);
        }
    }

    useEffect(() => {
        getExpenses()
    }, []);

    const addExpense = async () => {
        try{
            const res = await api.post('/api/expenses/', {name, category, amount, spent_at});
            if(res.status === 201) alert("Note created!");
            else alert("Failed to make note");
        } catch (error) {
            console.log(error);
        }

        setName("");
        setAmount(0);
        setCategory("");
        setSpent_at("");

        getExpenses();
    }

    const editExpense = async (taskId, payload) => {
        console.log("payload: ", payload);
        try {
            const res = await api.put(`/api/edit/${taskId}/`, payload);
            console.log(res)
            if(res.status === 200) {
                console.log("Expense updated")
            } else console.log("Failed to edit the expense");
        } catch (error) {
            console.error(error);
        }

        getExpenses();
    }

    const deleteExpense = async (taskId) => {
        try{
            const res = await api.delete(`/api/delete/${taskId}/`)

            if (res.status === 204) alert("Expense deletetd");
            else alert("Failed to delete expense.")

        } catch (error) {
            console.log(error);
        }

        getExpenses();
    }

    const value = {
        expenses, setExpenses,
        name, setName,
        category, setCategory,
        amount, setAmount,
        spent_at, setSpent_at,
        addExpense, deleteExpense, editExpense,
    }

    return <ExpenseContext.Provider value={value}>
        {children}
    </ExpenseContext.Provider>
}