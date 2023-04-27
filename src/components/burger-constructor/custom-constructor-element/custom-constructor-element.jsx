import { CurrencyIcon, DeleteIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import {useRef} from 'react'
import PropTypes from 'prop-types';

function CustomConstructorElement({text, price, thumbnail, handleDelete, index, moveCard, id}) {

    const ref = useRef(null)

    const [{ handlerId }, drop] = useDrop({
      accept: 'ingr',

      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        }
      },

      hover(item, monitor) {
        if (!ref.current) {
          return
        }
        const dragIndex = item.index
        const hoverIndex = index

        if (dragIndex === hoverIndex) {
          return
        }

        const hoverBoundingRect = ref.current?.getBoundingClientRect()
  
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      
        const clientOffset = monitor.getClientOffset()
    
        const hoverClientY = clientOffset.y - hoverBoundingRect.top

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }
      
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }
     
        moveCard(dragIndex, hoverIndex)

        item.index = hoverIndex
      },
    })

    const [{ isDragging }, drag] = useDrag({
      type: 'ingr',

      item: () => {
        return { id, index }
      },

      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    })

    const opacity = isDragging ? 0.5 : 1

    drag(drop(ref))

    return (
        <div className="constructor-element" ref={ref} data-handler-id={handlerId} style={{opacity}}>
            <span className="constructor-element__row">
                {thumbnail &&
                    <img className="constructor-element__image" src={thumbnail} alt={text}/>
                }

                <span className="constructor-element__text">
                    {text}
                </span>
                {
                    price && 
                    <>
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
                    </>
                }

            </span>
        </div>
    );
}

CustomConstructorElement.propTypes = {
  text: PropTypes.string,
  price: PropTypes.number,
  thumbnail: PropTypes.string,
  handleDelete: PropTypes.func,
  index: PropTypes.number,
  moveCard: PropTypes.func,
  id: PropTypes.string,
};


export default CustomConstructorElement;