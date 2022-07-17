import './App.css';
import Fruit from './file-json/buah.json'
import Comment from './file-json/komentar.json'

function App() {
  let commentArr = Comment.IComment;
  const NamaBuah = [...new Map(Fruit.IFruit.map(item => [item["fruitName"].toLowerCase(), item])).values()];
  const TypeBuah = [...new Set(Fruit.IFruit.map(item=> item.fruitType))];
  const typeBuah = (item) => {
    let isiWadah = [];
    for ( var i = 0; i < NamaBuah.length; ++i ) {
        if (NamaBuah[i]["fruitType"] === item) {
            isiWadah = [...isiWadah, NamaBuah[i]["fruitName"]];
        }
    }
    return isiWadah;
  };
  const stockBuah = (item) =>{
    let counts = 0;
    for ( var i = 0; i < NamaBuah.length; ++i ) {
        if (NamaBuah[i]["fruitType"] === item) {
            counts += NamaBuah[i]["stock"];
        }
    }
    return counts;
  }
  let totalComment = 0;
  const countComment = (commentArr) => {
    for (let i = 0; i < commentArr.length; i++) {
      if (typeof commentArr[i].replies === "undefined") {
        totalComment = totalComment + 1;
      }
      if (typeof commentArr[i].replies === "object") {
        totalComment++;
        countComment(commentArr[i].replies);
      }
    }
    return totalComment;
  };
  return (
    <div className="App">
      <h2>Case 1 (Soal No.1-4)</h2>
      <h3>Soal Nomor 1: </h3>
      <h4>Buah yang dimiliki Andi : 
      </h4>   
        <table className='table-buah' border="1px" cellSpacing="0" cellPadding="10px">
          <thead>
            <tr>
              <th>No</th>
              <th>Buah</th>
            </tr>
          </thead>
          <tbody>
            {NamaBuah.map((item, key) => {
              let no = 1 + key;
            return (
                  <tr key={key}>
                    <td>{no}</td>
                    <td className='data-buah'> {item.fruitName} </td>
                  </tr>
              )
            })}
          </tbody>
        </table>
      <h3>Soal Nomor 2:</h3>
      <h4>Jumlah wadah buah berdasarkan fruitType : {TypeBuah.length}</h4> 
      <h4>Wadah berisi buah berdasarkan fruitType :</h4>
        {
          TypeBuah.map((item, key) => {
          let ouputIsi = typeBuah(item);
          return (
            <div key={key} className="flex">
                <div className='item'>{item} :</div>
                  {
                    ouputIsi.map((dataitem, keyChild) => {
                      return (
                        <div key={keyChild} className='item'> {(dataitem)} </div>
                      )
                    })
                  }
            </div>
            )
          })
        }
      <h3>Soal Nomor 3:</h3>
      {
          TypeBuah.map((item, key) => {
          let StockBuah = stockBuah(item);
          return (
            <div key={key}>
              <p className='style-word'>
                  Total Stock {item} = <span className='stock'>{StockBuah}</span> buah
              </p>
            </div>
            )
          })
        }
      <h2>Case 2 (Soal No.5)</h2>
      <h4>Total komentar adalah {countComment(commentArr)} komentar</h4> 
    </div>
  );
}

export default App;
