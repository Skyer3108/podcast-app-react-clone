
import './style.css'

function Button({text,onClick,disable,style}){

    return(
<div onClick={onClick} className='custom-btn' disable={disable}  style={style}>{text}</div>
    )


}

export default Button