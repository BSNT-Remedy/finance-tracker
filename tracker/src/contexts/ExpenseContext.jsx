import { createContext, useContext, useState, useEffect } from "react";

const ExpenseContext = createContext()

export const useExpense = () => useContext(ExpenseContext);
export const ExpenseProvider = ({children}) => {
    const [expenses, setExpenses] = useState([]);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [amount, setAmount] = useState(0);
    const [spent_at, setSpent_at] = useState("");

    

    const getExpenses = async () => {
        const res = await fetch('http://127.0.0.1:8000/api/')
        const data = await res.json();
        console.log(data);
        setExpenses(data);
    }

    useEffect(() => {
        getExpenses()
    }, []);

    const addExpense = async () => {

        try{
            const res = await fetch('http://127.0.0.1:8000/api/new/', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({name, category, amount, spent_at})
            });
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
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/edit/${taskId}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            });
            console.log(res)
            if(res.ok) {
                console.log("Expense updated")
            } else console.log("Failed to edit the expense");
        } catch (error) {
            console.error(error);
        }

        getExpenses();
    }

    const deleteExpense = async (taskId) => {
        try{
            const res = await fetch(`http://127.0.0.1:8000/api/delete/${taskId}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            })

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