import './index.css'

const Buttons = props => {
  const {eachBtn, activeBtn, handleActiveBtn} = props
  const {id, label} = eachBtn
  const handleBtn = id => {
    handleActiveBtn(id)
    // console.log(id)
  }
  const buttonStyle =
    activeBtn === id ? 'active-button-desktop active-button-mobile' : ''
  // console.log(activeBtn === id)
  return (
    <li className="buttons-container-mobile">
      <button
        className={`${buttonStyle} buttons-list-item-desktop buttons-list-item-mobile`}
        onClick={() => handleBtn(id)}
      >
        {label}
      </button>
    </li>
  )
}
export default Buttons
