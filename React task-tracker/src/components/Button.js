const Button = ({onAdd, showAdd}) => {

    return (
        <button onClick={onAdd} className={showAdd ? 'btn red' : 'btn green'} >{showAdd ? 'Close' : 'Add'}</button>
    )
}

export default Button
