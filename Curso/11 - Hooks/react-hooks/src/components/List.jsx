import { useState, useEffect } from "react"

const List = ({getItens}) => {
  const [myItens, setMyItens] = useState([])

  useEffect(() => {
    console.log('Buscando itens do banco de dados...')
    setMyItens(getItens)
  }, [getItens])

  return (
    <div>
      {myItens && myItens.map((item) => (
          <p key={item}>{item}</p>
        ))
      }
    </div>
  )
}

export default List