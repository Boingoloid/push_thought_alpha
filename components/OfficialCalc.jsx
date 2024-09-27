import { useEffect, useState } from "react"


const OfficialCalc = ({ state, getData }) => {
  const [official, setOfficials] = useState([])
  useEffect(() => {
    console.log("Testing")
    fetch(`/api/officials?state=${state}`)

      .then(response => response.json())

      // .then(data => console.log(data))
      // Save data
      .then(data => {
        setOfficials(data)
        getData(data)
      })

      .catch(error => console.log(error));
  }, [state])

  return (
    <div>
      <h2>Test</h2>
      {official.length > 0 ? (
        official.map((item) => {
          return (
            <>
              <p>{item.Name}</p>
            </>
          )
        })
      ) : "empty"}
    </div>
  )
}
export default OfficialCalc