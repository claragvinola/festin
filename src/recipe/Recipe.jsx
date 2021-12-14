import './Recipe.css';

function Recipe({recipe}) {
    return (
      <li key={recipe.index} className="recipe">
          <p>{recipe.name}</p>
          <p>Fav {recipe.fav ? "Si" : "No"}</p>
          <p>{recipe["main-tag"]}</p>
          <p>{recipe.tags.map(item=><span>{item}</span>)}</p>
      </li>
    );
  }

  export default Recipe;
