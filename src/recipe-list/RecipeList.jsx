import Recipe from "../recipe/Recipe";
import './RecipeList.css';

function RecipeList({recipes}) {
    return (
      <ul className="RecipeList">
            {recipes.map(recipe => <Recipe key={recipe.id} recipe={recipe}/>)}
      </ul>
    );
  }

  export default RecipeList;
