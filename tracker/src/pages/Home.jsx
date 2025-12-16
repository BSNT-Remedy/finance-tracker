import { useState, useEffect } from "react";
import { useExpense } from "../contexts/ExpenseContext";
function Home(){
    const {
        expenses,
        name, setName,
        category, setCategory,
        amount, setAmount,
        spent_at, setSpent_at,
        addExpense, deleteExpense,
    } = useExpense();
    
    
    return <div>
        <div className="expense-form">
            <form>
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="name" 
                />
                <input 
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="category" 
                />
                <input 
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="amount" 
                />
                <input 
                    type="datetime-local"
                    value={spent_at}
                    onChange={(e) => setSpent_at(e.target.value)}
                    placeholder="date spent" 
                />
                <button type="button" onClick={addExpense}>
                    Add
                </button>
            </form>
        </div>
        {expenses.map(exp => (
            <div key={exp.id}>
                <h1>{exp.name} - {exp.amount}</h1>
                <button onClick={() => deleteExpense(exp.id)}>delete</button>
            </div>
        ))}
    </div>
}

export default Home;