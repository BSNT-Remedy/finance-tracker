import { useState, useEffect } from "react";
import { useExpense } from "../contexts/ExpenseContext";
import ExpenseFormModal from "../modals/ExpenseFormModal";
function Home(){
    const [addExpenseModal, setAddExpenseModal] = useState(false);
    const [editingId, setEditingId] = useState();
    const [editingName, setEditingName] = useState("");
    const [editingAmount, setEditingAmount] = useState(null);

    const {
        expenses,
        name, setName,
        category, setCategory,
        amount, setAmount,
        spent_at, setSpent_at,
        addExpense, deleteExpense, editExpense,
    } = useExpense();
    
    const editingExpense = (id) => {
        const exp = expenses.find(e => e.id === id);
        console.log("current: ", exp);
        setEditingId(exp.id);
        setEditingName(exp.name);
        setEditingAmount(exp.amount);
    }

    const saveExpense = (exp) => {
        const isoSpentAt = new Date(exp.spent_at).toISOString();

        editExpense(exp.id, {
            name: editingName,
            amount: editingAmount,
            category: exp.category,
            spent_at: isoSpentAt
        });

        setEditingId();
    }
    
    return <div>

        {addExpenseModal && <ExpenseFormModal onClose={() => setAddExpenseModal(false)}/>}

        <button className="add-expense-btn" onClick={() => setAddExpenseModal(true)}>+ New Expense</button>

        {expenses.map(exp => (
            <div key={exp.id}>
                {exp.id === editingId ? 
                    <div>
                        <input 
                            type="text" 
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                        /> -
                        <input 
                            type="number"
                            value={editingAmount} 
                            onChange={(e) => setEditingAmount(e.target.value)}
                        />
                        <button onClick={() => saveExpense(exp)}>save</button>   
                    </div>
                : 
                    <div>
                        <h1>{exp.name} - {exp.amount}</h1>
                        <button onClick={() => editingExpense(exp.id)}>edit</button>
                    </div>
                }
                
                <button onClick={() => deleteExpense(exp.id)}>delete</button>                
            </div>
        ))}
    </div>
}

export default Home;