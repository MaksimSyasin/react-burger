import { CurrencyIcon, DeleteIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd";

function CustomConstructorElement({text, price, thumbnail, handleDelete, index}) {

    

    const [{ isDragging }, dragRef2] = useDrag({ // Создаем драг-объект
        type: "ingredient2",
        item: {index},

    });

    return (
        <div className="constructor-element" ref={dragRef2}>
            <span className="constructor-element__row">
                <img className="constructor-element__image" src={thumbnail} alt={text}/>
                <span className="constructor-element__text">
                    {text}
                </span>
                <span className="constructor-element__price">
                    {price} 
                    <CurrencyIcon type="primary" />
                </span>
                <span className="constructor-element__action pr-2">
                    <div
                        onClick={()=> {
                            handleDelete(index)
                        }}
                    >
                        <DeleteIcon type="primary" />
                    </div>
                </span>
            </span>
        </div>
    );
}

export default CustomConstructorElement;