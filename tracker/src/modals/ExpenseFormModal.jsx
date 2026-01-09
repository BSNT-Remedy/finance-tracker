import { useExpense } from "../contexts/ExpenseContext";
import "../styles/ExpenseFormModal.css";
function ExpenseFormModal({onClose}) {
    const {
        name, setName,
        category, setCategory,
        amount, setAmount,
        spent_at, setSpent_at,
        addExpense,
    } = useExpense();

    return (
        <div className="expense-form">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    addExpense();
                    onClose();
                }}
            >
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="name" 
                />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="" disabled>choose category</option>
                    <option value="1">Rent</option>
                    <option value="2">Food</option>
                </select>
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

                <div className="expense-buttons">
                    <button 
                        type="button" 
                        className="cancel" 
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button 
                        type="submit" 
                    >
                        Add
                    </button>
                </div>
                
            </form>
        </div>
    )
}

export default ExpenseFormModal;