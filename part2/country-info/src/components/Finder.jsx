const Finder = ({ finder, setFinder }) => {
  return (
    <div>
      Find countries:{""}
      <input
        value={finder}
        onChange={(event) => setFinder(event.target.value)}
      />
    </div>
  )
}

export default Finder
