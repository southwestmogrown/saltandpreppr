import React from 'react';

function IngredientsPage({ingredients}) {
    const allIngredients = ingredients?.ingredients

    const keyGen = () => {
        return '_' + Math.random().toString(36).substr(2, 9)
    }
    
    return (
        <div>
            {allIngredients?.map(ingredient => (
                <div key={keyGen()}>
                    <li key={keyGen()} >{ingredient.name}</li>
                    <li key={keyGen()}>{ingredient.amount}</li>
                </div>
            ))}
        </div>
    )
}

export default IngredientsPage;
