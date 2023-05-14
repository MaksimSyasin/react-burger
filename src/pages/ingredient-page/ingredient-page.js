import { useNavigate, useParams } from 'react-router';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getIngredients } from '../../services/actions/ingredients';


function IngredientPage () {
    const ingredientId = useParams().ingredientId;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {ingredients} = useSelector(state => state.ingredients)

    const currentIngredient = ingredients.find(item => item._id === ingredientId)
    
    
    useEffect(()=> {
        dispatch(getIngredients())
    }, [dispatch])
    
    useEffect(() => {
        navigate(`/ingredients/${ingredientId}`, { replace: true });
    }, [ingredientId, navigate]);

    return (
        <section>
            {currentIngredient &&
            <IngredientDetails data={currentIngredient} />
            }
        </section>
    )
}

export default IngredientPage