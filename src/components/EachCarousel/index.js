import './index.css'

const EachCarousel = props => {
  const {eachBook} = props
  const {id, title, coverPic, authorName} = eachBook
  // console.log('title', title)
  // console.log('authorName', authorName)
  return (
    <div className="eachCarousel-container-desktop eachCarousel-container-mobile">
      <img src={coverPic} className="eachCarousel-image" alt={title} />

      <h1 className="eachCarousel-title">{title}</h1>
      <p className="eachCarousel-aoutherName">{authorName}</p>
    </div>
  )
}
export default EachCarousel
