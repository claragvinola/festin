import React, { useState, useEffect } from "react";

import RecipeList from "../recipe-list/RecipeList";
import InitialPage from "../initial-page/InitialPage";

const RecipeManager = () => {
    const [recipes, setRecipes] = useState([]);
    const [favRecipes, setFavRecipes] = useState([]);
    const [tags, setTags] = useState([]);
    const [sections, setSections] = useState([]);

    const [toggleFav, setToggleFav] = useState("all"); // Puede ser only fav, only no fav, all
    const [selectedSection, setSelectedSection] = useState("all");
    const [selectedTags, setSelectedTags] = useState([]);
    const [recipeName, setRecipeName] = useState("");

    const recipeUrl = "http://localhost:3004/recipes/";
    const favsUrl = "http://localhost:3004/recipes/?fav=true";
    const tagsUrl = "http://localhost:3004/tags";
    const sectionsUrl = "http://localhost:3004/main-tags";

    const fetchRecipes = (baseUrl, recipeName, toggleFav, section, selectedTags) => {
        console.log("en el fetch", selectedTags);
        const nameFilter = recipeName ? `name_like=${recipeName}` : "";

        const favFilter = {
            "all": "",
            "fav": "fav=true",
            "nofav": "fav=false",
        };

        const mainTagFilter = section !== "all" ? `main-tag_like=${section}` : "";


        const tagsFilter = selectedTags.length >= 0 ? `tags_like=${selectedTags.join()}` : "";

        console.log(tagsFilter);

        const url = `${baseUrl}?${nameFilter}&${favFilter[toggleFav]}&${mainTagFilter}&${tagsFilter}`;

        fetch(url)
            .then(response => response.json())
            .then((data) => {
                setRecipes(data);
            });
    };

    const fetchFavs = (url) => {
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                setFavRecipes(data);
            });
    };

    const fetchTags = (url) => {
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                setTags(data);
            });
    };

    const fetchSections = (url) => {
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                setSections(data);
            });
    };

    useEffect(() => {
        console.log("en el effect",selectedTags )
        fetchRecipes(recipeUrl, recipeName, toggleFav, selectedSection, selectedTags);
        fetchFavs(favsUrl);
        fetchTags(tagsUrl);
        fetchSections(sectionsUrl)
    }, [recipeUrl, recipeName, toggleFav, selectedSection, selectedTags]);

    const manageInput = (event) => {
        setRecipeName(event.currentTarget.value);
    };

    return (
        <>
            <InitialPage
                favs={favRecipes}
                sections={sections}
                tags={tags}
                manageInput={manageInput}
                setToggleFav={setToggleFav}
                setSelectedSection={setSelectedSection}
                setSelectedTags={setSelectedTags}
                selectedTags={selectedTags}/>
            <RecipeList recipes={recipes} />
        </>
    );
};

export default RecipeManager;